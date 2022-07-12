import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";
import SearchResult from "./SearchResult";

function SearchBar({ userObj }) {
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [users, setUsers] = useState([]);

  function focusSearch() {
    setShowDropdown(true);
    fetch("http://localhost:3001/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }

  function handleSearch(e) {
    setSearch(e.target.value);
  }
  const usersToInclude = users.filter((user) => {
    const firstAndLast = user.fName + " " + user.lName;

    if (user.id === userObj.id) {
      return false;
    } else if (search === "") {
      return true;
    } else if (
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      firstAndLast.toLowerCase().includes(search.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  });

  const searchResuts = usersToInclude.map((user) => {
    return <SearchResult key={user.id} user={user} />;
  });

  return (
    <Form
      className="d-flex"
      onFocus={focusSearch}
      onBlur={() => setShowDropdown(false)}
      onChange={handleSearch}
    >
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
      />

      <Dropdown.Menu
        style={{
          position: "fixed",
          left: "33%",
          width: "500px",
          top: "100px",
        }}
        show={showDropdown}
      >
        {searchResuts.length === 0 ? <div>No Results</div> : searchResuts}
      </Dropdown.Menu>
    </Form>
  );
}

export default SearchBar;
