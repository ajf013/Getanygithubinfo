import React, { useState, useEffect } from "react";
import DisplayTable from "./DisplayTable";
import { useTheme } from "../contexts/ThemeContext";

const Profile = () => {
  const [data, setData] = useState({});
  const [username, setUsername] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [placeholder, setPlaceholder] = useState("");
  const { theme } = useTheme();

  useEffect(() => {
    const text = "Search Username here...";
    let currentIndex = 0;
    let isDeleting = false;
    let timer;

    const type = () => {
      setPlaceholder(text.substring(0, currentIndex));

      if (!isDeleting && currentIndex < text.length) {
        currentIndex++;
        timer = setTimeout(type, 100);
      } else if (isDeleting && currentIndex > 0) {
        currentIndex--;
        timer = setTimeout(type, 50);
      } else if (!isDeleting && currentIndex === text.length) {
        isDeleting = true;
        timer = setTimeout(type, 2000); // Pause before deleting
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        timer = setTimeout(type, 500); // Pause before typing again
      }
    };

    type();

    return () => clearTimeout(timer);
  }, []);

  const onChangeHandler = e => {
    setUsername(e.target.value);
  };

  const submitHandler = async e => {
    e.preventDefault();

    if (!username.trim()) return;

    try {
      const profile = await fetch(`https://api.github.com/users/${username}`);
      const profileJson = await profile.json();

      if (profileJson.message === "Not Found") {
        alert("User not found!");
        return;
      }

      const repositories = await fetch(profileJson.repos_url);
      const repoJson = await repositories.json();

      if (profileJson) {
        console.log("Profile Data:", profileJson);
        console.log("Repo Data:", repoJson);
        setData(profileJson);
        setRepositories(repoJson);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <>
      <div style={{ padding: 20 }}>
        <div className="ui search">
          <form onSubmit={submitHandler}>
            <div className={`ui icon input ${theme === 'dark' ? 'inverted' : ''}`}>
              <input
                className="prompt"
                placeholder={placeholder}
                type="text"
                value={username}
                onChange={onChangeHandler}
              />
              <i className="search icon link" onClick={(e) => {
                console.log("Icon clicked");
                submitHandler(e);
              }}></i>
            </div>

            <button
              className={`ui primary button ${theme === 'dark' ? 'inverted' : ''}`}
              type="submit"
              style={{ marginLeft: '10px' }}
            >
              <i className="github icon"></i>
              Search
            </button>
          </form>
          <DisplayTable data={data} repositories={repositories} />
        </div>
      </div>
    </>
  );
};
export default Profile;