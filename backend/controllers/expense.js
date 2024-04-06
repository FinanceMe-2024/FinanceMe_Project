const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    const userId = req.user._id; 

    const income = ExpenseSchema({
        title,
        amount,
        category,
        description,
        date,
        user: userId
    })

    try {
        //validations
        if(!title || !category || !description || !date){
            return res.status(400).json({message: 'All fields are required!'})
        }
        if(amount <= 0 || !amount === 'number'){
            return res.status(400).json({message: 'Amount must be a positive number!'})
        }
        await income.save()
        res.status(200).json({message: 'Expense Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(income)
}

exports.getExpense = async (req, res) =>{
    const userId = req.user._id;
    try {
        const incomes = await ExpenseSchema.find({ user_id: userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteExpense = async (req, res) =>{
    const {id} = req.params;
    const userId = req.user._id;
    try {
        const income = await Income.findById(id);
        if (!income) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (income.user.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to delete this Expense' });
        }
        await income.remove();
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}