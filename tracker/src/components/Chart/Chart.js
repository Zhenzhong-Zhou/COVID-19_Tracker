import {useState, useEffect} from "react";
import {fetchDailyData} from "../../api";
import {Line, Bar} from "react-chartjs-2";
import styles from "./Chart.module.css";

const Chart = () => {
	const [dailyData, setDailyData] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			setDailyData(await fetchDailyData());
		}
		return fetchAPI();
	}, []);
	const lineChart = (
		dailyData.length ? (
			<Line data={{
				labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
				dataset:[{
					data: dailyData.map((confirmed) => confirmed),
					label: "Infected",
					borderColor: "#3333ff",
					fill: true
				}, {
					data: dailyData.map((recovered) => recovered),
					label: 'Recovered',
					borderColor: 'green',
					backgroundColor: 'rgba(0, 255, 0, 0.5)',
					fill: true,
				}, {
					data: dailyData.map((deaths) => deaths),
					label: "Deaths",
					borderColor: "red",
					backgroundColor: "rgba(0, 255, 0, 0.5)",
					fill: true
				}]
			}}/>
		) : null
	);
	return (
		<div className={styles.container}>
			{lineChart}
			1
		</div>
	)
};

export default Chart;