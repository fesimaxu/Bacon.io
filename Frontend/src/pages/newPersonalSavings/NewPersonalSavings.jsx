import React, { useState } from "react";
import { useNavigate } from "react-router";
import { plus, programTitle } from "../../assets";
import {
  Footer,
  Jumbotron,
  ProgramForm,
  ProgramItem,
  Wallet,
} from "../../components";
import { PERSONAL_SAVINGS_DETAILS_ROUTE } from "../../constants/routes";

const NewPersonalSavings = () => {
  const [items, setItems] = useState([]);
  const [dueDate, setDueDate] = useState("");
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  const handleSavings = () => {
    navigate(PERSONAL_SAVINGS_DETAILS_ROUTE);
  };

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const getItemWithKey = (item, length) => {
    const key = `k-${length}`;
    const itemWithKey = {
      ...item,
      key,
    };

    return itemWithKey;
  };
  const handleAddItem = (item) => {
    const itemWithKey = getItemWithKey(item, items.length);
    setItems(items.concat(itemWithKey));
    toggleForm();
  };

  const handleQtyInc = (key) => {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, quantity: Number(item.quantity) + 1 } : item
    );
    setItems(updatedItems);
  };
  const handleQtyDec = (key) => {
    const updatedItems = items.map((item) =>
      item.key === key && Number(item.quantity) > 1
        ? { ...item, quantity: Number(item.quantity) - 1 }
        : item
    );
    setItems(updatedItems);
  };

  const handleCostInc = (key) => {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, cost: Number(item.cost) + 1 } : item
    );
    setItems(updatedItems);
  };

  const handleCostDec = (key) => {
    const updatedItems = items.map((item) =>
      item.key === key && Number(item.cost) > 0
        ? { ...item, cost: Number(item.cost) - 1 }
        : item
    );
    setItems(updatedItems);
  };

  const handleQtyChange = (key, value) => {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, quantity: value } : item
    );
    setItems(updatedItems);
  };

  const handleCostChange = (key, value) => {
    const updatedItems = items.map((item) =>
      item.key === key ? { ...item, cost: value } : item
    );
    setItems(updatedItems);
  };

  const handleDateChange = (e) => {
    setDueDate(e.target.value);
  };
  return (
    <div className="flex flex-col h-[90vh]">
      <main className="ml-[78px] mr-[66px] pt-16 mb-auto">
        <div className="flex justify-between flex-wrap">
          <div>
            <h1 className="font-main font-bold text-[40px] leading-[52px]">
              Setup New Personal Savings
            </h1>
            <img src={programTitle} />
          </div>
          <Wallet />
        </div>
        <div className="px-[1px] py-[1px]  w-[100%] h-fit rounded-[20px] button flex flex-col items-center justify-center text-[25px] leading-[32.55px] font-bold font-main mt-16">
          <div className="bg-[#08081E] w-[100%] h-[100%] rounded-[20px] p-4">
            <div className="overflow-auto">
              <table className="w-[100%]  m-w-[450px]">
                <thead>
                  <tr>
                    <th
                      className="p-4 font-bold text-[20px] leading-6 font-main text-left"
                      colSpan={2}
                    >
                      Items
                    </th>
                    <th className="p-4 font-bold text-[20px] leading-6 font-main text-left">
                      Quantity
                    </th>
                    <th className="p-4 font-bold text-[20px] leading-6 font-main text-left">
                      Cost
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.length ? (
                    <>
                      {items.map((item) => (
                        <ProgramItem
                          key={item.key}
                          item={item}
                          onCostDec={handleCostDec}
                          onCostInc={handleCostInc}
                          onQtyDec={handleQtyDec}
                          onQtyInc={handleQtyInc}
                          onCostChange={handleCostChange}
                          onQtyChange={handleQtyChange}
                        />
                      ))}
                    </>
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center">
                        <Jumbotron message="No Items" />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {showForm ? (
              <ProgramForm onSubmit={handleAddItem} />
            ) : (
              <button
                className="button py-[3px] px-[20px] rounded-[20px] my-5 items-center font-normal font-main text-[20px] flex"
                onClick={toggleForm}
              >
                <img src={plus} />
                <span className="ml-3">Add Item</span>
              </button>
            )}
          </div>
        </div>
        <div className="button h-[120px] mt-20 rounded-[20px] p-[1px]">
          <div className=" h-[100%] rounded-[20px] bg-[#08081E] px-[50px] ">
            <p className="text-[18px] font-bold font-main leading-6 py-3">
              {" "}
              Due Date
            </p>

            <div className="button h-[50px] rounded-[20px] p-[1px]">
              <input
                value={dueDate}
                onChange={handleDateChange}
                className=" h-[100%] rounded-[20px] bg-[#08081E] w-full outline-none pl-2 "
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="button p-[8px] rounded-[20px] my-16 items-center font-normal font-main text-[20px]"
            onClick={handleSavings}
          >
            Save Program
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewPersonalSavings;
