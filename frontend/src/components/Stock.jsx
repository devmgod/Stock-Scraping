import { Container, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";

import bar from "../assets/img/bartchar.jpg";

const Stocks = () => {
  let [stocks, setStocks] = useState([]);
  const [today, setDate] = useState(new Date());
  useEffect(() => {
    axios.get("http://localhost:5000/fetch").then((res) => {
      if (res.data !== false) {
        setStocks(res.data);
      }
    });
  }, [stocks]);

  useEffect(() => {
    const s = setInterval(async () => {
      setDate(new Date());
      await axios.get("http://localhost:5000/fetch").then((res) => {
        if (res.data !== false) {
          setStocks(res.data);
        }
      });
    }, 1000);
    return () => {
      clearInterval(s); // Return a funtion to clear the timer so that it will stop being called on unmount
    };
  }, []);
  const locale = "en";

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const date = `${day}, ${today.getDate()} ${today.toLocaleDateString(locale, {
    month: "long",
  })}\n\n`;

  const hour = today.getHours();
  const wish = `Good ${
    (hour < 12 && "Morning") || (hour < 17 && "Afternoon") || "Evening"
  }, `;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: true,
    minute: "numeric",
    second: "numeric",
  });

  console.log("aaaa", stocks);

  return (
    <div className=" py-5">
      <Card className="text-center">
        {wish}
        {date}
        {time}
        {hour}
      </Card>
      <Container className="d-flex justify-content-center">
        <Card>
          <Card.Header>
            <h1>Stocks</h1>
          </Card.Header>
          <Card.Body>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {stocks != false ? (
                  stocks.map((item, index) => {
                    if (
                      item.stockname === "ΑΛΦΑ" ||
                      item.stockname === " ΠΕΙΡ" ||
                      item.stockname === "ΕΤΕ" ||
                      item.stockname === "ΟΤΕ" ||
                      item.stockname === "ΟΠΑΠ"
                    ) {
                      return (
                        <tr key={index}>
                          <td>{item.stockname}</td>
                          <td>{item.stockvalue}</td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <p className="text-danger">
                    {" "}
                    !!! Please check your internet connection
                  </p>
                )}
              </tbody>
            </table>
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <h1>Visualization</h1>
          </Card.Header>
          <Card.Body>
            {<img src={bar} alt="stock bar" width={350} height={700} />}
          </Card.Body>

          {<ProgressBar now={60} label={`${60}%`} />}
        </Card>
      </Container>
    </div>
  );
};

export default Stocks;
