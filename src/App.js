import { useState } from "react";
import "./App.css";

const foodDatabase = [
  { name: "Ackee, canned, drained", protein: 2.9, carbs: 0.8, fat: 15.2, sugar: 0.8, fibre: 0.0, calories: 151.0 },
  { name: "Agar, dried", protein: 1.3, carbs: 0.1, fat: 1.2, sugar: 0.1, fibre: 0.0, calories: 16.0 },
  { name: "Alfalfa sprouts, raw", protein: 4.0, carbs: 0.4, fat: 0.7, sugar: 0.3, fibre: 0.0, calories: 24.0 }
];

export default function App() {
  const [log, setLog] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("g");

  const addFood = () => {
    const food = foodDatabase.find(f => f.name.toLowerCase() === foodName.toLowerCase());
    if (!food) return alert("Food not found in database.");
    const multiplier = parseFloat(amount) / 100;
    const entry = {
      date: new Date().toLocaleDateString(),
      name: food.name,
      amount: parseFloat(amount),
      unit,
      protein: food.protein * multiplier,
      carbs: food.carbs * multiplier,
      fat: food.fat * multiplier,
      sugar: food.sugar * multiplier,
      salt: 0,
      fibre: food.fibre * multiplier,
      calories: food.calories * multiplier
    };
    setLog([...log, entry]);
    setFoodName("");
    setAmount("");
    setUnit("g");
  };

  const total = log.reduce((acc, cur) => {
    acc.protein += cur.protein;
    acc.carbs += cur.carbs;
    acc.fat += cur.fat;
    acc.sugar += cur.sugar;
    acc.salt += cur.salt;
    acc.fibre += cur.fibre;
    return acc;
  }, { protein: 0, carbs: 0, fat: 0, sugar: 0, salt: 0, fibre: 0 });

  return (
    <div className="container">
      <h1>Karenate's Food Tracker</h1>
      <input placeholder="Food name" value={foodName} onChange={e => setFoodName(e.target.value)} />
      <input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} type="number" />
      <select value={unit} onChange={e => setUnit(e.target.value)}>
        <option value="g">g</option>
        <option value="tbsp">tbsp</option>
        <option value="tsp">tsp</option>
      </select>
      <button onClick={addFood}>Add</button>
      <div>
        <h2>Today’s Log</h2>
        {log.map((item, i) => (
          <div key={i}>
            {item.amount}{item.unit} {item.name} → Protein: {item.protein.toFixed(1)}g, Carbs: {item.carbs.toFixed(1)}g, Fat: {item.fat.toFixed(1)}g, Sugar: {item.sugar.toFixed(1)}g, Salt: {item.salt.toFixed(1)}g, Fibre: {item.fibre.toFixed(1)}g
          </div>
        ))}
        <div className="totals">
          Totals → Protein: {total.protein.toFixed(1)}g, Carbs: {total.carbs.toFixed(1)}g, Fat: {total.fat.toFixed(1)}g, Sugar: {total.sugar.toFixed(1)}g, Salt: {total.salt.toFixed(1)}g, Fibre: {total.fibre.toFixed(1)}g
        </div>
      </div>
    </div>
  );
}
