import { useEffect, useState } from "react";

function Youtube() {
	const [youTubeVideos, setYouTubeVideos] = useState([]);
	useEffect(() => {
		fetch(
			`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCE_M8A5yxnLfW0KghEeajjw&maxResults=6&order=date&key=%20AIzaSyCqkD2LoqLwU6wPFEVawgoFsONl4NesqbA0`
		)
			.then((response) => response.json())
			.then((data) => {
				const videos = data.items;
				setYouTubeVideos(videos);
			});
	},[]);
	return (
		<section className="youtubeVideosWrapper">
			<div className="allVideosWrapper">
				<div className="container">
					<div className="row justify-content-center text-center">
						<div className="col-12">
							<div className="title-wraper">
								Latest Videos <br />
								<br />
							</div>
						</div>

						

						{youTubeVideos?.map((singleVideo, i) => {
							let vidId = singleVideo.id.videoId;
							let vidLink = `https://www.youtube.com/watch?v=${vidId}`;
							let videoWrapper = (
								<div key={i} className="col-sm-12 col-md-6 col-lg-4">
									<div className="singleVideoWrapper">
										<div className="videoThumbnail">
											<a href={vidLink} target="_blank" rel="noreferrer">
												<img
													src={singleVideo.snippet.thumbnails.high.url}
													alt="thumbnails"
												/>
											</a>
										</div>
										<div className="videoInfoWrapper">
											<div className="videoTitle">
												<a href={vidLink} target="_blank" rel="noreferrer">
													{singleVideo.snippet.title}
												</a>
											</div>
											<div className="videoDesc">
												{singleVideo.snippet.description}
											</div>
										</div>
									</div>
								</div>
							);
							return videoWrapper;
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Youtube;
