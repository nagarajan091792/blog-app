import React, { Component } from 'react'

export default class ViewPost extends Component {
  render() {
    let style = {
      marginTop: '80px',
      display: 'block',
      backgroundColor: 'rgba(0,0,0,0.8)'
    }
    return (
      <div class="modal show fade" style={style} >
        <div class="modal-dialog" >
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title " >{this.props.title}</h4>

              <button type="button" class="btn-close" onClick={this.props.hide}>
              </button>

            </div>
            <img class="card-img-top" style={{ height: '300px' }} src={this.props.imageURL} alt="blog"  />

            <div class="modal-body">
              <p>{this.props.content}</p>

            </div>

          </div>
        </div>
      </div>
    )
  }
}
