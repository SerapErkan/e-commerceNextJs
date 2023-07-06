const { default: mongoose } = require("mongoose");

const todoSchema = new mongoose.Schema({
    _id: String,
    work: String,
    isCompleted: Boolean,
    date: Date
});

export default mongoose.models.Todo || mongoose.model("Todo", todoSchema);