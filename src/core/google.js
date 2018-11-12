/** 
* | Description: 
* +---------------------------------------------------|
* | Author: 浩丶IMOYH [oyhemail@163.com]
* | Last Modified: 2018-11-12
**/
const Puppeteer = require('puppeteer');

const Qs = require('qs');

const Async = require('async');

const GoogleHosts = require('../config/googleHosts');

const Params = {
	num: 100,
	cr: 'countryUS',
	gl: 'US',
	lr: 'lang_en',
	aq: 'f',
}


function google(query, callback) {
	const domain = query.domain || null;
	const keywords = query.keywords || null;

	// 过滤传进来的参数
	for(let key in Params) {
		if(query[key]) Params[key] = query[key];
	}
	
	// 判断参数完整性
	if(!domain || !keywords || !keywords.length) {
		callback({
			error: '参数不完整',
		});
		console.log('参数不完整，停止执行！');
		return;
	}
	console.log('================ 开始爬取，共 ' + keywords.length + ' 个关键词 ===================');
	console.log('================ ' + new Date() + ' ===================');
	// 获取数据
	getData(domain, keywords, 5).then((data) => {
		callback(data);
		console.log('================ 爬取完成 ===================');
		console.log('================ ' + new Date() + ' ===================');
	}).catch((error) => {
		callback(error);
	})
}


function getData(domain, keywords, limit) {
	return new Promise((resolve, reject) => {
		// 创建浏览器实例
		Puppeteer.launch({
			headless: false,
			slowMo: 50,
		}).then(async browser => {
			const page = await browser.newPage(); // 打开新标签
			await page.setViewport({width: 1366, height: 768}); // 设置宽高

			// 结果容器
			let resultData = [];
			let eachTemp = {
				searchResult: [],
				queryResult: {},
				keyword: null,
				id: null,
				googleUrl: ''
			}
			for (let i=0, len=keywords.length; i<len; i++) {
				Params['q'] = keywords[i].keyword;
				eachTemp.keyword = keywords[i].keyword;
				eachTemp.id = keywords[i].id;
				eachTemp.googleUrl = `https://${GoogleHosts[parseInt(Math.random()*(GoogleHosts.length-1))]}/search?${Qs.stringify(Params)}`;

				console.log('==========================');
				console.log('爬取关键词：', eachTemp.keyword);

				// 打开 google 页面
				console.log('打开页面：', eachTemp.googleUrl);
				await page.goto(eachTemp.googleUrl, {waitUntil:"networkidle0"});
				await page.waitFor(parseInt(Math.random()*300));

				// 获取搜索结果
				console.log('获取搜索列表...');
				eachTemp.searchResult = await page.evaluate(getSearchResult);
				console.log('获取到：'+ eachTemp.searchResult.length + '条搜索结果');
				// 判断是否拿到搜索结果
				if(!eachTemp.searchResult.length) break;

				// 获取查询结果
				console.log('获取查询结果...');
				console.log('查询域名：', domain);
				eachTemp.queryResult = getQueryResult(eachTemp.searchResult, eachTemp.keyword, domain);
				eachTemp.queryResult['id'] = eachTemp.id;

				if(eachTemp.queryResult.position) {
					console.log('排名位置：', eachTemp.queryResult.position);
				} else {
					console.log('排名位置：无排名');
				}
				// console.log('==========================');
				// 将数据压入结果容器
				resultData.push({code: 1, query: eachTemp.queryResult});
			}

			resolve(resultData);
			// await browser.close();
		}).catch((error) => {
			reject(error);
			console.log(error);
		});
	})
}


function getSearchResult() {
	let array = [];
	document.querySelectorAll('#search .rc').forEach((item) => {
		let $title = item.querySelector('.r h3');
		let $url = item.querySelector('.r a');
		let $discription = item.querySelector('.s .st');
		array.push({
			title: $title ? $title.innerHTML : '',
			url: $url ? $url.getAttribute('href') : '',
			discription: $discription ? $discription.innerHTML : '',
		});
	});
	return array;
}

function getQueryResult(searchResult, keywordItem, domain) {
	// 获取查询结果
	let queryResult = {};
	for (let i = 0, len = searchResult.length; i < len; i++) {
		if(searchResult[i].url.indexOf(domain) != -1) {
			queryResult = searchResult[i];
			queryResult['position'] = i + 1;
			break;
		}
	}
	queryResult['id'] = keywordItem.id;
	queryResult['keyword'] = keywordItem.keyword;
	queryResult['domain'] = domain;
	return queryResult;
}



// 暴露接口
module.exports = google;