// const main=require('../model/database')
// main().catch(err=>console.log(err))
// const taskModel=require('../model/taskModel')

// const addTask=async(req,res)=>{
//     const {taskname,taskdate,tasktime}=req.body;
//     const userid=req.headers.userid;
//     taskModel.create(
//         {userid,taskname,taskdate,tasktime}
//     )
//     res.json("new task is created")
//     res.end()

// }
// const fetchTask=async(req,res)=>{
//     const userid=req.headers.userid;
//     const record=await taskModel.find({userid:userid}).populate('userid');
//     if(record.length>0){
//         res.json({status:1,record:record})
//     }
//     else{
//         res.json({status:2,record:[]})
//     }
// }

// const findById=async(req,res)=>{
//     const record=await taskModel.find({_id:req.params.id});
//     if(record.length>0){
//         res.json(record)
//     }
//     else{
//         res.json([])
//     }
// }

// const taskDelete=async(req,res)=>{
//     const taskid=req.params.id;
//     await taskModel.deleteOne({_id:taskid})
//     res.json("task is  deleted")
//     res.end()
// }

// const updateDatas=async(req,res)=>{
//     const id=req.headers.taskid;
//     console.log(id)
//     const {taskname,taskdate,tasktime}=req.body
//     console.log(req.body)
//     await taskModel.updateOne({_id:id},req.body)
//     res.json("data update")
// }

// module.exports={
//     addTask,
//     fetchTask,
//     taskDelete,
//     findById,
//     updateDatas
// }


// const main = require('../model/database');
// const taskModel = require('../model/taskModel');



// main().catch(err => console.log(err));

// const addTask=async(req,res)=>{
//         const {taskname,taskdate,tasktime}=req.body;
        
//         const userid=req.headers.userid;
//         taskModel.create(
//             {userid,taskname,taskdate,tasktime}
//         )
//         res.json("new task is created")
//         res.end()
//     }


//     const fetchTask=async(req,res)=>{
//         const record=await taskModel.find()
//         if(record.length>0){
//             res.json(record)
//         }
//         else{
//             res.json([])
//         }
//         }

// const findById = async (req, res) => {
//     try {
//         const record = await taskModel.find({ _id: req.params.id });
//         res.json(record.length > 0 ? record : []);
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const taskDelete = async (req, res) => {
//     try {
//         const taskid = req.params.id;
//         await taskModel.deleteOne({ _id: taskid });
//         res.json({ message: "Task is deleted" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// const updateDatas = async (req, res) => {
//     try {
//         const id = req.headers.taskid;
//         const { taskname, taskdate, tasktime } = req.body;
//         await taskModel.updateOne({ _id: id }, req.body);
//         res.json({ message: "Data updated" });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports = {
//     addTask: [ addTask],
//     fetchTask: [ fetchTask],
//     taskDelete: [ taskDelete],
//     findById: [ findById],
//     updateDatas: [ updateDatas]
// };
