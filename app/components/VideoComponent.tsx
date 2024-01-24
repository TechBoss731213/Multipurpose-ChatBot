import React from "react";

interface VideoComponentProps {
	videoUrl: string;
}

const VideoComponent: React.FC<VideoComponentProps> = ({ videoUrl }) => {
	return (
		<video width="320" height="240" controls preload="none" className="w-[600px]">
			<source src={videoUrl} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
};

export default VideoComponent;