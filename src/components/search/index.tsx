function Search({ keyword, setKeyword }: { keyword: string, setKeyword: (value: string) => void }) {
  return (
    <div className="w-full border-b-[1px] border-solid border-white-10 pb-[30px] mb-[30px]">
      <input
        className="
          text-sm
          text-white
          w-full
          rounded-[6px]
          px-[18px]
          py-[0]
          h-[60px]
          border-[3px]
          border-solid
          border-[white-50]
          transition
          duration-200
          bg-black-light
          outline-none
          placeholder-white-50
          focus:transition
          border-tutor-main"
        type="text"
        placeholder="Keyword"
        id="search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  );
}

export default Search;
