import styles from "./index.module.sass";

const Search = () => {
  return (
    <div className={styles.search}>
      <label htmlFor="search">Search</label>
      <input type="text" placeholder="Keyword" id="search" />
    </div>
  );
};

export default Search;
