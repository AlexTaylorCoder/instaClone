import React, { useState } from "react";
import { Form, Dropdown } from "react-bootstrap";
import SearchResult from "./SearchResult";

import { FiSearch } from "react-icons/fi";

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
  const usersToInclude = users.filter(function (user) {
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

  const searchResuts = usersToInclude.map(
    function (user) {
      if (this.count > 6) {
        return null;
      }

      this.count++;
      return <SearchResult key={user.id} user={user} />;
    },
    { count: 0 }
  );

  function handleBlur(e) {
    // if the blur was because of outside focus
    // currentTarget is the parent element, relatedTarget is the clicked element
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowDropdown(false);
    }
  }
  return (
    <Form
      style={{ marginLeft: "350px" }}
      className="d-flex"
      onFocus={focusSearch}
      onBlur={handleBlur}
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
          left: "45%",
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
