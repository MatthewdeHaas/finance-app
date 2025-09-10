import CreateBudget from '../components/CreateBudget'
import Graphs from '../components/Graphs'


const Budget = () => {
  return (

    <div className="flex flex-col text-center">

      <p className="text-4xl font-semi-bold p-2">
        Budgets
      </p>

      <div className="flex flex-row px-24">

        {/* Create Category */}
        <div className="flex flex-col px-12 py-4 space-y-6">
          <p>Create Budget</p>
          <CreateBudget />  
        </div>

        {/* Graphs */}
        <div className="grow flex flex-col px-12 py-4 space-y-6">
          <p>Graphs</p>
          <Graphs />
        </div>

      </div> 

    </div>

  );
};


export default Budget;
