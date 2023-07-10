import React, { Component } from "react";
import { saveLocal, getLocal, removeLocal } from "./LocalStorage";

export default class extends Component {
  state = {
    arrCheckOut: [],
  };

  btnCheckOut = () => {
    window.scrollTo(0, 0);
    this.props.clearInput();

    let newCheckOut = this.state.arrCheckOut;
    if (this.props.value.Username != "") {
      this.props.disabledChecked(newCheckOut);
      newCheckOut.push(this.props.value);
      this.setState({
        ...this.state,
        arrCheckOut: newCheckOut,
      });
      newCheckOut.map((item) => {
        let vitri = item.arrSeat;
        vitri.map((item1) => {
          document.getElementById(`${item1}`).checked = true;
          document.getElementById(`${item1}`).disabled = true;
        });
      });
      saveLocal(this.state.arrCheckOut);
      getLocal();
    } else {
      console.log("rong");
    }
  };

  btnXoa = (id) => {
    let arrCheckOut = this.state.arrCheckOut;
    let newARR = arrCheckOut.splice(id, 1);
    this.setState({
      ...this.state,
      arrCheckOut: arrCheckOut,
    });

    newARR.map((item) => {
      let viTriSeat = item.arrSeat;
      viTriSeat.map((item1) => {
        document.getElementById(`${item1}`).checked = false;
        document.getElementById(`${item1}`).disabled = false;
      });
    });
    saveLocal(this.state.arrCheckOut);
    getLocal();
    this.props.clearSeat();
  };
  shouldComponentUpdate(nextProps, nextState) {
    if (
      this.props.disabledChecked !== nextProps.disabledChecked ||
      this.state.arrCheckOut !== nextState.arrCheckOut
    ) {
      return true;
    }

    return true;
  }
  componentDidMount() {
    const arrNew = getLocal();
    if (arrNew) {
      this.setState({
        arrCheckOut: arrNew,
      });
    }
  }
  render() {
    let giatien = this.props.value.Giatien;
    return (
      <div className="container d-inline-block text-center">
        <div className="in4ThanhToan">
          <table className="table text-white">
            <thead>
              <tr>
                <th>Họ Tên</th>
                <th>Số Người</th>
                <th>Vị Trí Ghế</th>
                <th>Thành Tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{this.props.value.Username}</td>
                <td>{this.props.value.Numseats}</td>
                <td>{this.props.value.arrSeat}</td>
                <td>
                  {giatien?.reduce((acc, item) => acc * 1 + item * 1, [0])}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="btn_action">
          <button
            disabled={this.props.disbtnCheckOut}
            onClick={this.btnCheckOut}
            className="btn btn-success"
          >
            Xác Nhận Thanh Toán
          </button>
        </div>
        <div
          className="displayerBoxes txt-center w-100"
          style={{ overflowX: "auto" }}
        >
          <table className="Displaytable w3ls-table" width="100%">
            <tr>
              <td width="30%">Họ Tên </td>
              <td>Số người </td>
              <td>Vị trí chỗ </td>
              <td>Tổng tiền</td>
              <td>Action</td>
            </tr>
            {this.state.arrCheckOut.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.Username}</td>
                  <td>{item.Numseats}</td>
                  <td>
                    {item.arrSeat
                      .map((item1) => {
                        return item1 + " ";
                      })
                      .sort()}
                  </td>
                  <td>
                    {item.Giatien?.reduce(
                      (acc, item) => acc * 1 + item * 1,
                      [0]
                    )}
                  </td>
                  <td>
                    <button
                      onClick={() => this.btnXoa(index)}
                      className="btn btn-danger opacity-75"
                    >
                      Xóa
                    </button>
                    {/* <button className="btn btn-warning opacity-75">Sửa</button> */}
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}
