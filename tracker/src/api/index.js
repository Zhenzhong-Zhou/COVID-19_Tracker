import axios from "axios";

const url = "https://covid19.mathdro.id/api";

export const fetchData = async () => {
	try {
		const { data: { confirmed, recovered, deaths, lastUpdate} } = await axios.get(url);
		return {confirmed, recovered, deaths, lastUpdate};
	} catch (error) {
		console.log(error);
	}
};

export const fetchDailyData = async () => {
	try {
		const { data } = await axios.get('https://api.covidtracking.com/v1/ca/daily.json');
		// const { data } = await axios.get(`${url}/daily`);

		// return data.map(({ positive, recovered, death, dateChecked: date }) => ({ confirmed: positive, recovered, deaths: death, date }));
		return data.map((dailyData) => ({
			confirmed: dailyData.confirmed.total,
			recovered: dailyData.recovered.total,
			deaths: dailyData.deaths.total,
			date: dailyData.reportDate,
		}));
	} catch (error) {
		return error;
	}
};