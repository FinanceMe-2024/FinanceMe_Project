const Expense = require("../models/ExpenseModel");

exports.addExpense = async (req, res) => {
    const { title, amount, category, description, date } = req.body;
    const userId = req.user._id;

    try {
        const newExpense = new Expense({
            title,
            amount,
            category,
            description,
            date,
            user_id: userId
        });

        await newExpense.save();
        res.status(200).json({ message: 'Expense Added', expense: newExpense });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.getExpenses = async (req, res) => {
    const userId = req.user._id;

    try {
        const expenses = await Expense.find({ user_id: userId }).sort({ createdAt: -1 });
        res.status(200).json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};

exports.deleteExpense = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const expense = await Expense.findById(id);
        if (!expense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        if (expense.user_id.toString() !== userId.toString()) {
            return res.status(403).json({ message: 'You do not have permission to delete this Expense' });
        }
        await expense.remove();
        res.status(200).json({ message: 'Expense Deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
};
