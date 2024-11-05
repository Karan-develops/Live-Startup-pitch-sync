import SearchFormBtn from "./SearchFormBtn";
import { ScanSearch } from "lucide-react";
import Form from "next/form";

const SearchForm = ({ query }: { query?: string }) => {
  return (
    <Form action={"/"} scroll={false} className="search-form">
      <input
        autoComplete="off"
        name="query"
        defaultValue={query}
        className="search-input"
        placeholder="Search Startups ..."
      />
      <div className="flex gap-2">
        {query && <SearchFormBtn />}

        <button type="submit" className="search-btn text-white">
          <ScanSearch className="h-8 w-8" />
        </button>
      </div>
    </Form>
  );
};

export default SearchForm;
