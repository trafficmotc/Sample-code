const axios = require('axios');
const jsSHA = require('jssha');

const getAuthorizationHeader = function() {
	var AppID = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';
	var AppKey = 'FFFFFFFF-FFFF-FFFF-FFFF-FFFFFFFFFFFF';

	var GMTString = new Date().toGMTString();
	var ShaObj = new jsSHA('SHA-1', 'TEXT');
	ShaObj.setHMACKey(AppKey, 'TEXT');
	ShaObj.update('x-date: ' + GMTString);
	var HMAC = ShaObj.getHMAC('B64');
	var Authorization = 'hmac username=\"' + AppID + '\", algorithm=\"hmac-sha1\", headers=\"x-date\", signature=\"' + HMAC + '\"';

	return { 'Authorization': Authorization, 'X-Date': GMTString};
}

axios.get('https://traffic.transportdata.tw/MOTC/v2/Road/Traffic/VD/Freeway?$top=10&$format=JSON', { // 欲呼叫之API網址(此範例為[高速公路局]車輛偵測器基本資料)
	headers: getAuthorizationHeader(),
})
	.then(function(response){
		console.log(response.data);
	});
