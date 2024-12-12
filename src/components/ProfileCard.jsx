import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {FetchUserData, FetchUserRepos} from "../apiRequests/api";
import Repos from "./Repos";


const ProfileCard = () => {
	const [userData, setUserData] = useState(null);
	const { username } = useParams();
	useEffect(() => {
		const fetchProfile = async () => {
			const data = await FetchUserData(username);
			setUserData(data);
		}
		fetchProfile();
	}, [username])


	if (userData == null) {
		return <>No data available</>
	}
	const event = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));

	const created_At = userData.created_at;
	const NewDate = new Date(created_At);
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	};

	const parsedDate = (NewDate.toLocaleDateString(undefined, options));

	return (
		<>
		<section>
			<div className="bg-gray-800 text-white flex items-center justify-center flex-col p-44">
				<div className="avatar mb-7  ">
					<img src={userData.avatar_url} alt={userData.name} className="h-48 w-48  rounded-full border-8 border-yellow-500  " />
				</div>
				<h1 className="text-4xl font-bold mb-4">{userData.name}</h1>
				<h2>
					<a href={userData.html_url} target="_blank" className="bg-gradient-to-b from-yellow-100 to-yellow-500 bg-clip-text not-italic text-transparent font-bold text-2xl">  @{userData.login}</a>
				</h2>
				<div className="bottom__wrapper flex gap-7 my-4 items-center">
					<span>{userData.location}</span>

					<p className="text-lg flex items-center justify-center gap-2"> Joined on <span className="font-bold"> {parsedDate} </span></p>
				</div>

				<div className="wrapper flex gap-4 items-center justify-center text-center">
					<div className="Repositories bg-gray-600 p-6">
						<span className="font-bold text-xl">{userData.public_repos}</span>
						<p >Repositories</p>
					</div>
					<div className="followers bg-gray-600 p-6 ">
						<span className="font-bold text-xl">{userData.followers}</span>
						<p>following</p>
					</div>
					<div className="following bg-gray-600 p-6">
						<span className="font-bold text-xl">{userData.following}</span>
						<p>followers</p>
					</div>
				</div>
			</div>

		</section>
		<Repos/>
		</>
	)
}

export default ProfileCard;