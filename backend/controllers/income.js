const Income= require("../models/IncomeModel")


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date}  = req.body
    const userId = req.user._id; 

    const newIncome = new Income({
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
        await newIncome.save()
        res.status(200).json({message: 'Income Added'})
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }

    console.log(Income)
}

exports.getIncomes = async (req, res) =>{
    const userId = req.user._id;
    try {
        const incomes = await Income.find({ user: userId }).sort({ createdAt: -1 });
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Server Error'})
    }
}

exports.deleteIncome = async (req, res) =>{
    const {id} = req.params;
    const userId = req.user._id;
    IncomeSchema.findByIdAndDelete(id)
        .then((income) =>{
            res.status(200).json({message: 'Income Deleted'})
        })
        .catch((err) =>{
            res.status(500).json({message: 'Server Error'})
        })
}