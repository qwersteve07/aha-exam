import styles from './index.module.sass';

function Search({ keyword, setKeyword }: { keyword: string, setKeyword: (value: string) => void }) {
  return (
    <div className={styles.search}>
      <input type="text" placeholder="Keyword" id="search" value={keyword} onChange={e => setKeyword(e.target.value)} />
    </div>
  );
}

export default Search;
