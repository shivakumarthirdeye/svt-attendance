import { Line } from "@ant-design/plots";
import { Card, DatePicker } from "antd";
import moment from "moment";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import NewDashboardCard from "../../Card/Dashboard/NewDashboardCard";
import Loader from "../../loader/loader";
import { loadDashboardData } from "../../../redux/rtk/features/dashboard/dashboardSlice";
import UserPrivateComponent from "../../PrivateRoutes/UserPrivateComponent";

//Date fucntinalities
let startdate = moment(new Date()).startOf("month").format("YYYY-MM-DD");
let enddate = moment(new Date()).endOf("month").format("YYYY-MM-DD");

const DemoLine = () => {
	const data = useSelector((state) => state.dashboard.list?.workHoursByDate);

	const cardInformation = useSelector((state) => state.dashboard.list);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadDashboardData({ startdate, enddate }));
	}, []);

	const { RangePicker } = DatePicker;

	const onCalendarChange = (dates) => {
		startdate = (dates?.[0]).format("YYYY-MM-DD");
		enddate = (dates?.[1]).format("YYYY-MM-DD");

		dispatch(loadDashboardData({ startdate, enddate }));
	};

	const config = {
		data,
		xField: "date",
		yField: "time",
		seriesField: "type",
		yAxis: {
			label: {
				formatter: (v) => `${v / 1000} Hours`,
			},
		},
		legend: {
			position: "top",
		},
		smooth: true,
		animation: {
			appear: {
				animation: "path-in",
				duration: 5000,
			},
		},
	};

	return (
		<Fragment>
			<UserPrivateComponent permission={"read-dashboard"}>
				<div className='mb-3 mt-3 w-full' style={{ maxWidth: "25rem" }}>
					<RangePicker
						onCalendarChange={onCalendarChange}
						defaultValue={[moment().startOf("month"), moment().endOf("month")]}
						className='range-picker'
					/>
				</div>

				<NewDashboardCard information={cardInformation} />

				<Card title='WORK HOURS '>
					{data ? <Line {...config} /> : <Loader />}
				</Card>
			</UserPrivateComponent>
		</Fragment>
	);
};

export default DemoLine;
