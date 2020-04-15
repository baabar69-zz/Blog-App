import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
export default class Blogs extends Component {
  constructor() {
    super();
    this.state = {
      list: [],
      limit:8,
      page:1,
      // totalPages:4,
      scrolling: false
    };
  }
  componentDidMount() {
    this.getData();
    this.scrollListener =window.addEventListener("scroll",(e)=> {
       this.handleScroll(e)
    })
  }
  handleScroll(){

const scrollable = document.documentElement.scrollHeight -window.innerHeight;
const scrolled = window.scrollY +10;

if(scrolled >= scrollable  ){
  this.loadMore()
}

  }
  getData() {
    const {limit, page} = this.state;
    const url =`http://localhost:3000/api/v1/post?page=${page}&limit=${limit}`
    fetch(url).then(
      (response) => {
        response.json().then((result) => {
          this.setState({ list: [...this.state.list, ...result.data] ,scrolling :false});
        });
      }
    );
  }

  delete(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    var bearer = "Bearer " + token;

    fetch("http://localhost:3000/api/v1/post/" + id, {
      method: "Delete", 
        headers: {
          "Content-Type": "application/json",
          "Authorization": bearer,
        },
    }).then((response) => {
      response.json().then((result) => {
        this.getData();
        window.location.reload()
        console.log(result);
      });
    });
    
    console.log(id);
  }

  loadMore= ()=>
  {
    this.setState(prevState => ({
      page: prevState.page+1, 
    }), this.getData)
  }
  render() {
    return (
      <div>
        <h1>Blogs List</h1>
        <p>LazyLoad/InfiniteScroll  enabled . 8 More items will load when you scroll to the end of the page ,If any available</p>
        {this.state.list ? (
          <div className="row">
            {this.state.list.map((item, i) => (
              <div className="column">
                <Card style={{ width: "18rem" }}>
                  <Card.Img
                    variant="top"
                    src={"http://localhost:3000/uploads/" + item.image}
                  />
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>{item.textContent}</Card.Text>
                    {/* {console.log(item.tags)} */}
                    <div>
                      {item.tags.map((item, i) => (
                        <Button
                          key={item._id}
                          className="tagz"
                          variant="success"
                        >
                          {item}
                        </Button>
                      ))}
                    </div>
                    <br />
                    <Button variant="dark">
                      <Link
                        style={{ color: "#fff" }}
                        className="transfer"
                        to={"/update/" + item._id}
                      >
                        Edit
                      </Link>
                    </Button>
                    <Button
                      style={{ marginLeft: 5.0 }}
                      onClick={() => {
                        this.delete(item._id);
                      }}
                      variant="danger"
                    >
                      Delete
                    </Button>
                  </Card.Body>
                </Card>
                
              </div>
            ))}
          
          </div>
        ) : (
          <p>Please wait...</p>
        )}
      </div>
    );
  }
}