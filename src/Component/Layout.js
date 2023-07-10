import React, { Component } from "react";
import { arrSeats } from "./DataArrSeats";
import HandleSeat from "./HandleSeat";
import { saveLocal, getLocal, removeLocal } from "./LocalStorage";

export default class Layout extends Component {
  state = {
    value: { Username: "", Numseats: "", Giatien: [], arrSeat: [] },
    qualitySeat: 0,
    disabledInput: false,
    disabledBtn: true,
    disabledCheck: false,
    error: "",
    res: "",
  };
  getValue = (event) => {
    let { value, id } = event.target;
    let newValue = this.state.value;
    newValue[id] = value;
    this.setState({
      value: { [id]: value },
    });
    if (this.state.value.Numseats == "" || this.state.value.Username == "") {
      this.setState({
        ...this.state,
        disabledBtn: true,
      });
    } else if (
      this.state.value.Numseats !== "" ||
      this.state.value.Username !== ""
    ) {
      this.setState({
        ...this.state,
        disabledBtn: false,
      });
    }
  };
  clearInput = () => {
    document.getElementById("Username").value = "";
    document.getElementById("Numseats").value = "";
    document.getElementById("Username").disabled = false;
    document.getElementById("Numseats").disabled = false;
    this.setState({
      ...this.state,
      value: { Username: "", Numseats: "", Giatien: [], arrSeat: [] },
      qualitySeat: 0,

      error: "",
      res: "",
    });
  };
  disabledChecked = (arrCheckOut) => {
    let hangSeats = arrSeats.map((item) =>
      item.danhSachGhe.map((item1) => item1.soGhe)
    );
    let arrIdSeat = [];
    let idSeats = hangSeats.map((item) => {
      return item.map((item1) => {
        return arrIdSeat.push(item1);
      });
    });

    arrCheckOut.map((item) => {
      item.arrSeat.map((item1) => {
        arrIdSeat.map((item2) => {
          if (item2 != item1) {
            document.getElementById(`${item2}`).checked = false;
            document.getElementById(`${item2}`).disabled = false;
          }
        });
        document.getElementById(`${item1}`).checked = true;
        document.getElementById(`${item1}`).disabled = true;
      });
    });
  };

  clearSeat = (event) => {
    window.scrollTo(0, 0);
    this.setState({
      ...this.state,
      value: { Username: "", Numseats: "", Giatien: [], arrSeat: [] },
      qualitySeat: 0,
      disabledInput: false,
      disabledBtn: true,
      disabledCheck: false,
      error: "",
      res: "",
    });
    this.state.value.arrSeat.map((item) => {
      document.getElementById(item).checked = false;
      document.getElementById(item).disabled = false;
    });
    // this.componentDidUpdate();
  };
  submitSeat = (event) => {
    this.state.qualitySeat == this.state.value.Numseats
      ? this.setState({
          ...this.state,
          disabledCheck: true,
          disabledInput: true,
          disabledBtn: true,
          error: "",
          res: "Đặt vé thành công! Hãy thanh toán ngay!!!",
        })
      : this.setState({
          error: "Chưa đúng số lượng ghế mà bạn cần!",
        });
  };

  getChecked = (event) => {
    let { checked, id, value } = event.target;
    console.log("value: ", value);
    let newId = this.state.value.arrSeat;
    let newValue = this.state.value.Giatien;
    if (checked) {
      newId.push(id);
      newValue.push(value);
      this.setState({
        ...this.state,
        qualitySeat: this.state.qualitySeat + 1,
      });
    } else if (checked == false) {
      let arrNew = newId.filter((item) => item !== id);
      newValue.push(-value);
      this.setState({
        ...this.state,
        qualitySeat: this.state.qualitySeat - 1,
        value: {
          ...this.state.value,
          arrSeat: arrNew,
          Giatien: newValue,
        },
      });
    }
  };
  shouldComponentUpdate(newProps, newState) {
    return true;
  }
  componentDidMount() {
    const arrSeats = getLocal();

    if (arrSeats) {
      let newARR = [];
      for (var i = 0; i < arrSeats.length; i++) {
        newARR.push(arrSeats[i].arrSeat);
      }
      newARR.map((item) => {
        item.map((item1) => {
          document.getElementById(`${item1}`).checked = true;
          document.getElementById(`${item1}`).disabled = true;
        });
      });
    }
  }

  render() {
    return (
      <div>
        <div>
          <div>
            <link rel="stylesheet" href="/assests/css/font-awesome.min.css" />
          </div>

          <h1>Movie Seat Selection</h1>
          <div className="container">
            <div className="w3ls-reg">
              <div className="inputForm">
                <h2>Fill The Required Details Below And Select Your Seats</h2>
                <div className="mr_agilemain">
                  <div className="agileits-left">
                    <label>
                      {" "}
                      Tên
                      <span>*</span>
                    </label>
                    <input
                      disabled={this.state.disabledInput}
                      onChange={this.getValue}
                      type="text"
                      id="Username"
                      required
                    />
                  </div>
                  <div className="agileits-right">
                    <label>
                      {" "}
                      Số người
                      <span>*</span>
                    </label>
                    <input
                      disabled={this.state.disabledInput}
                      onChange={this.getValue}
                      type="number"
                      id="Numseats"
                      required
                      min={1}
                    />
                  </div>
                </div>
                <button
                  onClick={this.submitSeat}
                  disabled={this.state.disabledBtn}
                  className="btn btn-success opacity-75 mt-2"
                >
                  Đặt chỗ
                </button>
                <p className="text-danger">{this.state.error}</p>
                <p className="text-success">{this.state.res}</p>
              </div>

              <ul className="seat_w3ls">
                <li className="smallBox greenBox">Chỗ của bạn</li>
                <li className="smallBox redBox">Hết chỗ</li>
                <li className="smallBox emptyBox">Chỗ Trống</li>
              </ul>

              <div
                className="seatStructure mx-5 text-center"
                style={{ overflowX: "auto" }}
              >
                <p id="notification" />
                <table id="seatsBlock">
                  <tbody>
                    <tr>
                      <td />
                      <td>1</td>
                      <td>2</td>
                      <td>3</td>
                      <td>4</td>
                      <td>5</td>

                      <td>6</td>
                      <td>7</td>
                      <td>8</td>
                      <td>9</td>
                      <td>10</td>
                      <td>11</td>
                      <td>12</td>
                    </tr>
                    {arrSeats.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.hang}</td>
                          {item.danhSachGhe.map((item1, index1) => {
                            return (
                              <td key={index1}>
                                <input
                                  id={item1.soGhe}
                                  disabled={this.state.disabledCheck}
                                  onChange={this.getChecked}
                                  type="checkbox"
                                  className="seats"
                                  value={item1.gia}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <div className="screen">
                  <h2 className="wthree">SCREEN THIS WAY</h2>
                </div>
              </div>

              <HandleSeat
                clearSeat={this.clearSeat}
                value={this.state.value}
                clearInput={this.clearInput}
                disabledChecked={this.disabledChecked}
                disbtnCheckOut={this.state.disabledBtn == true ? false : true}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
