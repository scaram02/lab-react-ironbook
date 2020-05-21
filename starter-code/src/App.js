import React from 'react';
import './App.css';
import users from "./users";

class App extends React.Component {
  state = {
    users: users,
    search: "",
    teacher: false,
    student: false,
    campus: "all"
  };

  handleChange = event => {
    this.setState(
      {

        search: event.target.value
      },
      () => {
        // console.log("StATE:", this.state);
      }
    );
  };

  handleCheckboxChange = event => {
    this.setState({
      [event.target.name]: event.target.checked
    });
  };

  handleChangeDropDown = event => {
    this.setState({
      campus: event.target.value
    });
  };

  render() {
    let filteredArr = users.filter(user => {
      return (
        user.firstName
          .toLowerCase()
          .startsWith(this.state.search.toString().toLowerCase()) ||
        user.lastName
          .toLowerCase()
          .startsWith(this.state.search.toString().toLowerCase())
      );
    });

    if (this.state.campus === "all") {
      //
    } else {
      filteredArr = filteredArr.filter(user => {
        return user.campus === this.state.campus;
      });
    }

    if (this.state.teacher && this.state.student) {
    } else if (this.state.student) {
      filteredArr = filteredArr.filter(user => {
        return user.role === "student";
      });
    } else if (this.state.teacher) {
      filteredArr = filteredArr.filter(user => {
        return user.role === "teacher";
      });
    }

    let campusArr = [...new Set(users.map(user => user.campus))];

    return (
      <div>
        <h1>IronBook</h1>
        <label htmlFor="">Search for a name</label>
        <input
          type="text"
          id="search"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
        />

        <label htmlFor="student">Student</label>
        <input
          type="checkbox"
          name="student"
          id="student"
          checked={this.state.student}
          onChange={this.handleCheckboxChange}
        />

        <label htmlFor="teacher">Teacher</label>
        <input
          type="checkbox"
          name="teacher"
          id="teacher"
          checked={this.state.teacher}
          onChange={this.handleCheckboxChange}
        />

        <label>
          Campus:
          <select name="campusList" onChange={this.handleChangeDropDown}>
            <option value="all">All</option>
            {campusArr.map(campus => {
              return <option value={campus}>{campus}</option>;
            })}
          </select>
        </label>

        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Links</th>
            </tr>
          </thead>

          {filteredArr.map((user, index) => {
            return (
              <tbody>
                <tr key={index}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.campus}</td>
                  <td>{user.role}</td>
                  <td>
                    <a href={user.linkedin ? user.linkedin : null}>
                      <img
                        src={user.linkedin ? "../linkedin.png" : null}
                        height="4%"
                        alt=""
                      />
                    </a>
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    );
  }
}

export default App;
