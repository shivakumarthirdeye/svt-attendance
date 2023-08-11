import React from "react";
import tw from "tailwind-styled-components";
import DesignationTimelineSvg from "./DesignationTimelineSVG";
import moment from "moment";
import { loadSingleStaff } from "../../redux/rtk/features/user/userSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import BtnDeleteSvg from "./Button/btnDeleteSvg";
import { deleteSalaryHistory } from "../salaryHistory/salaryHistoryApis";
import SalaryEditSinglePopup from "./PopUp/SalaryEditSinglePopup";
import SalaryTimelineSvg from "./SalaryTimelineSVG";

const EmployeeSalary = ({ list, edit, setLoading }) => {
	const user_id = useParams("id");
	const dispatch = useDispatch();

	const deletedSalaryHistory = async (id) => {
		setLoading(true);
		const { data } = await deleteSalaryHistory(id);

		// check if data is deleted or not and call the setPopUp function
		if (data) {
			dispatch(loadSingleStaff(user_id.id));
			setLoading(false);
		} else {
			setLoading(false);
		}
	};
	return (
		<div>
			<main class='container mx-auto w-full flex justify-center mt-5'>
				<ol class='border-l-2 border-slate-600'>
					{list &&
						list?.map((item) => {
							return (
								<li>
									<div class='md:flex flex-start'>
										<SalaryTimelineSvg />
										<div class='block p-6  max-w-md ml-6 mb-5 '>
											<div class='flex justify-between mb-4'>
												<Heading>Salary : {item?.salary}</Heading>

												<Heading>
													{moment(item?.startDate).format("YYYY")} -{" "}
													{item?.endDate
														? moment(item?.endDate).format("YYYY")
														: "Present"}
												</Heading>

												{edit && (
													<div>
														<SalaryEditSinglePopup
															data={item}
															setLoading={setLoading}
														/>

														<button
															onClick={() => deletedSalaryHistory(item.id)}>
															<BtnDeleteSvg size={20} />
														</button>
													</div>
												)}
											</div>

											<Heading1>
												Comment : <Heading2>{item?.comment}</Heading2>
											</Heading1>
											<Heading1 class=''>
												Start Date :{" "}
												<Heading2>
													{" "}
													{moment(item?.startDate).format("ll")}
												</Heading2>
											</Heading1>

											<Heading1 class=''>
												End Date :{" "}
												<Heading2>
													{item.endDate
														? moment(item?.endDate).format("ll")
														: "Present"}
												</Heading2>
											</Heading1>
										</div>
									</div>
								</li>
							);
						})}
				</ol>
			</main>
		</div>
	);
};

const Heading = tw.h3`
font-medium
text-base
mr-20
w-500
txt-color-2
		 `;

const Heading1 = tw.h3`
font-medium
text-sm
mr-20
w-500
txt-color-2
		 `;

const Heading2 = tw.span`
font-medium 
text-sm
txt-color-secondary`;

export default EmployeeSalary;
