import React from 'react';

export class ClockService {
    apiUrl = "http://localhost:5000/api/";
    hasData = false;
    data = [];
    gotData() {
        return this.hasData;
    }
    async getData(startTime, endTime) {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem("token1"), startTime: startTime, endTime: endTime })
        };

        const response = await fetch(this.apiUrl + 'user/getclock', requestOptions);
        const datas = await response.json();
        this.data = datas.res;
        return datas;
    }
    getData1()
    {
        return this.data;
    }
    getDataLength() {
        return this.data.length;
    }
    mapData() {
        console.log("start", this.data.length);
        const elements = [];
        for (let i = 0; i < this.data.length; i++) {
            console.log(this.data.length);
            var a = this.getSingleData(i);
            elements.push(a)
        }

        return elements;
    }
    getSingleData(i) {

        return this.data[i];
    }
}