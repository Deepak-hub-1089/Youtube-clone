import React, { useEffect, useState } from 'react';
import "./Feed.css";
import { Link } from 'react-router-dom';
import { API_KEY } from "../Data.js";
import {moment} from 'moment'

export default function Feed({ category }) {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=1000&regionCode=IN&videoCategoryId=${category}&key=${API_KEY}`;
    
    await fetch(videoList_url)
      .then(response => response.json())
      .then(data => setData(data.items))
      .catch(err => console.error("Error fetching data: ", err));
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <div className='feed'>
      {data.map((item, index) => {
        const { snippet, statistics } = item;
        const thumbnail = snippet?.thumbnails?.medium?.url || snippet?.thumbnails?.default?.url;
        const title = snippet?.title;
        const channelTitle = snippet?.channelTitle;
        const viewCount = statistics?.viewCount;
        const publishedAt = new Date(snippet?.publishedAt).toLocaleDateString();

        return (
          <Link key={index} to={`video/${item.snippet.categoryId}/${item.id}`} className='card'>
            <img src={thumbnail} alt={title} />
            <h2>{title}</h2>
            <h3>{channelTitle}</h3>
            <p>{viewCount} views • {publishedAt}</p>
          </Link>
        );
      })}
    </div>
  );
}
