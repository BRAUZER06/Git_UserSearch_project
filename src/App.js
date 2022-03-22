import React from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = React.useState("");
  const [fetchUser, setFetchUser] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickBtnForm = () => {
    fetchUserGit();
  };
  //deboubce
  const onChangeInput = async (e) => {
    let timeout;
    setInputValue(e.target.value);
    return function () {
      clearTimeout(timeout);
      timeout = setTimeout(async () => {
        fetchUserGit();
      }, 700);
    };
  };

  async function fetchUserGit() {
    setIsLoading(true);
    try {
      const respons = await axios
        .get(`https://api.github.com/users/${inputValue}`)
        .then((res) => setFetchUser(res.data));
    } catch (error) {
      alert("Такого пользователя нет ");
      console.log(error);
    }
    setIsLoading(false);
  }

  return (
    <div id="app">
      <div className="app-container">
        {isLoading && <span>...Loading</span>}
        <form onClick={(e) => e.preventDefault()} className="app-form">
          <input
            disabled={isLoading}
            value={inputValue}
            onChange={(e) => onChangeInput(e)}
            type="text"
            className="app-input"
            placeholder="Укажите GitHub-аккаунт"
          />
          <button
            onClick={onClickBtnForm}
            disabled={isLoading}
            className="app-form_btn"
          >
            Найти
          </button>
        </form>
        {fetchUser.name ? (
          <div className="app-user">
            <div className="app-user_info">
              <div className="app-user_image">
                <img
                  className="img"
                  src={fetchUser.avatar_url}
                  alt=""
                  href={fetchUser.html_url}
                />
              </div>
              <div className="app-user_data">
                <h1 className="app-user_name" href={fetchUser.html_url}>
                  {fetchUser.name}
                  <span href={fetchUser.html_url}>@{fetchUser.login}</span>
                </h1>
                <p className="app-user_about">{fetchUser.bio}</p>
              </div>
            </div>
            <ul className="app-user_stats">
              <li className="app-user_stats-item">
                Репозитории
                <span>{fetchUser.public_repos}</span>
              </li>
              <li className="app-user_stats-item">
                Подписчиков
                <span>{fetchUser.followers}</span>
              </li>
              <li className="app-user_stats-item">
                Звёзд
                <span>{fetchUser.public_gists}</span>
              </li>
            </ul>
            <ul className="app-user_location">
              <li className="app-user_location-item">{fetchUser.location}</li>
              <li className="app-user_location-item">
                <a href={fetchUser.blog}>{fetchUser.blog}</a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="block_bufer"></div>
        )}
      </div>
    </div>
  );
}

export default App;
