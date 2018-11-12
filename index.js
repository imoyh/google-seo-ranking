/** 
* | Description: 
* +---------------------------------------------------|
* | Author: 浩丶IMOYH [oyhemail@163.com]
* | Last Modified: 2018-11-10
**/

const express = require('express');

const app = express();

// 测试地址
app.use('/test', express.static('test'));

// 查询google排名
const google = require('./src/core/google');
app.get('/google',(req, res) => {
	console.clear();
	req.query['domain'] = 'www.jiuhuheadphone.com';
	req.query['keywords'] = [
		// {"id": 1, "keyword": "china bluetooth earpieces noise cancelling manufacturers"},
		// {"id": 2, "keyword": "wholesale waterproof sport bluetooth earphone"},
		// {"id": 3, "keyword": "sports earphones manufacturers"},
		// {"id": 4, "keyword": "wholesale neckband bluetooth headset"},
		// {"id": 5, "keyword": "Bluetooth Over Ear Headphones Shenzhen"},
		// {"id": 6, "keyword": "Factory Promotional Neckband Headset"},
		// {"id": 7, "keyword": "ODM Active Noise Cancelling Bluetooth Headset"},
		// {"id": 8, "keyword": "Wholesale Active Noise Cancelling Bluetooth Headset"},
		// {"id": 9, "keyword": "ODM Over Ear Active Noise Cancelling Bluetooth Headset"},
		// {"id": 10, "keyword": "Wholesale Over Ear Active Noise Cancelling Bluetooth Headset"},
		// {"id": 11, "keyword": "Over Ear Active Noise Cancelling Bluetooth Headset Factory"},
		// {"id": 12, "keyword": "ODM Bluetooth Headphone Neckband"},
		// {"id": 13, "keyword": "Wholesale Bluetooth Headphone Neckband"},
		// {"id": 14, "keyword": "Bluetooth Headphone Neckband Manufacturers"},
		// {"id": 15, "keyword": "Bluetooth Headphones Magnetic Wireless Earbuds Manufacturers"},
		// {"id": 16, "keyword": "Bluetooth Headphones Magnetic Wireless Earbuds Factory"},
		// {"id": 17, "keyword": "ODM Bluetooth Earphone In Ear"},
		// {"id": 18, "keyword": "China Wireless Earphone With Charging Box"},
		// {"id": 19, "keyword": "Wireless Earphone With Charging Box Factory"},
		// {"id": 20, "keyword": "ODM Swimming Earphones"},
		// {"id": 21, "keyword": "Swimming Earphones Manufacturers"},
		// {"id": 22, "keyword": "Tws Earphone Manufacturers"},
		// {"id": 23, "keyword": "ODM Neckband Bluetooth Headphone"},
		// {"id": 24, "keyword": "Wholesale Neckband Bluetooth Headphone"},
		// {"id": 25, "keyword": "ODM Active Noise Canceling Headphone"},
		// {"id": 26, "keyword": "OEM Active Noise Canceling Headphone"},
		// {"id": 27, "keyword": "ODM Bluetooth Neckband Earphone"},
		// {"id": 28, "keyword": "OEM Bluetooth Neckband Earphone"},
		// {"id": 29, "keyword": "Wholesale Bluetooth Neckband Earphone"},
		// {"id": 30, "keyword": "ODM Bluetooth Over Ear Headphone"},
		// {"id": 31, "keyword": "ODM Business Earphone"},
		// {"id": 32, "keyword": "ODM Active Noise Canceling Over Head Earphone"},
		// {"id": 33, "keyword": "OEM Active Noise Canceling Over Head Earphone"},
		// {"id": 34, "keyword": "ODM Active Noise Canceling Bluetooth Headsets"},
		// {"id": 35, "keyword": "Wholesale Active Noise Canceling Bluetooth Headsets"},
		// {"id": 36, "keyword": "ODM Tws Base Wireless Earbuds"},
		// {"id": 37, "keyword": "OEM Tws Base Wireless Earbuds"},
		// {"id": 38, "keyword": "Tws Bluetooth Wireless Sports Earphone Manufacturers"},
		// {"id": 39, "keyword": "Waterproof Sports Earphones Manufacturers"},
		// {"id": 40, "keyword": "Waterproof Sports Earphones Suppliers"},
		// {"id": 41, "keyword": "ODM Over Ear Bluetooth Wireless Headphones"},
		// {"id": 42, "keyword": "ODM Foldable Over Ear Active Noise Cancelling Bluetooth Headset"},
		// {"id": 43, "keyword": "OEM Foldable Over Ear Active Noise Cancelling Bluetooth Headset"},
		// {"id": 44, "keyword": "Wholesale Foldable Over Ear Active Noise Cancelling Bluetooth Headset"},
		// {"id": 45, "keyword": "Foldable Over Ear Active Noise Cancelling Bluetooth Headset Factory"},
		// {"id": 46, "keyword": "ODM Best Bluetooth Over Ear Headphones"},
		// {"id": 47, "keyword": "Wholesale Best Bluetooth Over Ear Headphones"},
		// {"id": 48, "keyword": "ODM Bluetooth Over Ear Headphones Shenzhen"},
		// {"id": 49, "keyword": "OEM Bluetooth Over Ear Headphones Shenzhen"},
		// {"id": 50, "keyword": "China Bluetooth Over Ear Headphones Shenzhen"},
		// {"id": 51, "keyword": "Wholesale Bluetooth Over Ear Headphones Shenzhen"},
		// {"id": 52, "keyword": "Fashion Bluetooth Over Ear Headphones Shenzhen"},
		// {"id": 53, "keyword": "luetooth Over Ear Headphones Shenzhen Manufacturers"},
		// {"id": 54, "keyword": "Bluetooth Over Ear Headphones Shenzhen Suppliers"},
		// {"id": 55, "keyword": "Bluetooth Over Ear Headphones Shenzhen Factory"},
		// {"id": 56, "keyword": "ODM Wireless Stereo Headphone Neckband"},
		// {"id": 57, "keyword": "ODM Bluetooth In-ear Earphone Neckband"},
		// {"id": 58, "keyword": "Wholesale Bluetooth In-ear Earphone Neckband"},
		// {"id": 59, "keyword": "ODM Neckband Headphones With Microphone"},
		// {"id": 60, "keyword": "ODM Retractable Neckband Bluetooth Headset"},
		// {"id": 61, "keyword": "Wholesale Retractable Neckband Bluetooth Headset"},
		// {"id": 62, "keyword": "ODM Bluetooth Headphone Neckband Retractable"},
		// {"id": 63, "keyword": "OEM Bluetooth Headphone Neckband Retractable"},
		// {"id": 64, "keyword": "Wholesale Bluetooth Headphone Neckband Retractable"},
		// {"id": 65, "keyword": "Bluetooth Headphone Neckband Retractable Factory"},
		// {"id": 66, "keyword": "ODM Bluetooth In-ear Headphone Neckband"},
		// {"id": 67, "keyword": "ODM Factory Promotional Neckband Headset"},
		// {"id": 68, "keyword": "OEM Factory Promotional Neckband Headset"},
		// {"id": 69, "keyword": "China Factory Promotional Neckband Headset"},
		// {"id": 70, "keyword": "Wholesale Factory Promotional Neckband Headset"},
		// {"id": 71, "keyword": "Fashion Factory Promotional Neckband Headset"},
		{"id": 72, "keyword": "Factory Promotional Neckband Headset Manufacturers"},
		{"id": 73, "keyword": "Factory Promotional Neckband Headset Factory"},
		{"id": 74, "keyword": "ODM Neckband Wireless Headphones"},
		{"id": 75, "keyword": "ODM Bluetooth In-ear Wireless Neckband Headset"},
		{"id": 76, "keyword": "ODM Bluetooth Headset Neckband Retractable"},
		{"id": 77, "keyword": "Wholesale Bluetooth Headset Neckband Retractable"},
		{"id": 78, "keyword": "ODM Active Noise Canceling Bluetooth Stereo Headphone"},
		{"id": 79, "keyword": "OEM Active Noise Canceling Bluetooth Stereo Headphone"},
		{"id": 80, "keyword": "Wholesale Active Noise Canceling Bluetooth Stereo Headphone"},
		{"id": 81, "keyword": "ODM Neckband Style Wireless Earphone"},
		{"id": 82, "keyword": "Wholesale Neckband Style Wireless Earphone"},
		{"id": 83, "keyword": "Wholesale Bluetooth Neckband Headphones"}
	]; 

	google(req.query,(data) => {
		res.json(data);
	});

});


app.listen(8080, () => {
	console.log('服务启动');
});



