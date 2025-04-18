
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectItem, SelectContent } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";

const foodDatabase = [
  { name: "Croissant", protein: 8.3, carbs: 38.3, fat: 26.6, sugar: 5.0, fibre: 1.8, calories: 406.0 },
  { name: "Peanuts, kernel only, plain, weighed with shells", protein: 17.7, carbs: 8.6, fat: 31.8, sugar: 4.3, fibre: 0.0, calories: 389.0 },
  { name: "Beef, braising steak, raw, lean", protein: 21.8, carbs: 0.0, fat: 5.7, sugar: 0.0, fibre: 0.0, calories: 139.0 },
  { name: "Sausages, pork, reduced fat, raw", protein: 14.4, carbs: 8.7, fat: 5.6, sugar: 3.5, fibre: 2.3, calories: 141.0 },
  { name: "Fish paste", protein: 15.3, carbs: 3.7, fat: 10.5, sugar: 0.5, fibre: 2.6, calories: 170.0 },
  { name: "Corn snacks", protein: 6.0, carbs: 60.8, fat: 30.4, sugar: 5.5, fibre: 1.3, calories: 526.0 },
  { name: "Apricots, stewed with sugar", protein: 0.7, carbs: 18.3, fat: 0.1, sugar: 18.3, fibre: 0.0, calories: 72.0 },
  { name: "Bloater, flesh only, grilled, weighed with bone", protein: 15.3, carbs: 0.0, fat: 11.3, sugar: 0.0, fibre: 0.0, calories: 163.0 },
  { name: "Bhaji, aubergine and potato, homemade", protein: 1.8, carbs: 13.4, fat: 8.8, sugar: 3.2, fibre: 0.0, calories: 135.0 },
  { name: "Milk, human, mature", protein: 1.3, carbs: 7.2, fat: 4.1, sugar: 7.2, fibre: 0.0, calories: 69.0 },
];

export default function FoodTracker() {
  const [log, setLog] = useState([]);
  const [foodName, setFoodName] = useState("");
  const [filteredFoods, setFilteredFoods] = useState([]);
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("g");

  const addFood = () => {
    const match = foodDatabase.find(f => f.name.toLowerCase().includes(foodName.toLowerCase()));
    if (!match) return alert("Food not found in database.");
    const multiplier = parseFloat(amount) / 100;
    const entry = {
      date: new Date().toLocaleDateString(),
      name: match.name,
      amount: parseFloat(amount),
      unit,
      protein: match.protein * multiplier,
      carbs: match.carbs * multiplier,
      fat: match.fat * multiplier,
      sugar: match.sugar * multiplier,
      salt: 0,
      fibre: match.fibre * multiplier,
      calories: match.calories * multiplier
    };
    setLog([...log, entry]);
    setFoodName("");
    setAmount("");
    setUnit("g");
    setFilteredFoods([]);
  };

  const handleFoodNameChange = (e) => {
    const value = e.target.value;
    setFoodName(value);
    if (value.length > 1) {
      const matches = foodDatabase.filter(f => f.name.toLowerCase().includes(value.toLowerCase()));
      setFilteredFoods(matches.slice(0, 10));
    } else {
      setFilteredFoods([]);
    }
  };

  const selectSuggestion = (name) => {
    setFoodName(name);
    setFilteredFoods([]);
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
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Karenate's Food Tracker</h1>
      <div className="flex flex-col gap-2 w-full max-w-xl">
        <div className="relative">
          <Input placeholder="Food name" value={foodName} onChange={handleFoodNameChange} />
          {filteredFoods.length > 0 && (
            <ScrollArea className="absolute bg-white border w-full max-h-40 overflow-y-auto z-10 rounded-md shadow-md">
              {filteredFoods.map((food, i) => (
                <div
                  key={i}
                  className="px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() => selectSuggestion(food.name)}
                >
                  {food.name}
                </div>
              ))}
            </ScrollArea>
          )}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Amount" value={amount} onChange={e => setAmount(e.target.value)} type="number" />
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger>{unit}</SelectTrigger>
            <SelectContent>
              <SelectItem value="g">g</SelectItem>
              <SelectItem value="tbsp">tbsp</SelectItem>
              <SelectItem value="tsp">tsp</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={addFood}>Add</Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-2">Today’s Log</h2>
          {log.map((item, index) => (
            <div key={index} className="text-sm mb-1">
              {item.amount}{item.unit} {item.name} → Protein: {item.protein.toFixed(1)}g, Carbs: {item.carbs.toFixed(1)}g, Fat: {item.fat.toFixed(1)}g, Sugar: {item.sugar.toFixed(1)}g, Salt: {item.salt.toFixed(1)}g, Fibre: {item.fibre.toFixed(1)}g
            </div>
          ))}
          <div className="mt-2 font-semibold">
            Totals → Protein: {total.protein.toFixed(1)}g, Carbs: {total.carbs.toFixed(1)}g, Fat: {total.fat.toFixed(1)}g, Sugar: {total.sugar.toFixed(1)}g, Salt: {total.salt.toFixed(1)}g, Fibre: {total.fibre.toFixed(1)}g
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
