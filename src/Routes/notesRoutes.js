const express= require("express")
const router= express.Router();
const authMiddelware= require("../middleWare/auth");

const {createNote}=require("../controllers/notes/createNote")
const { updateNotes}=require("../controllers/notes/updateNote")
const { replaceNote}=require("../controllers/notes/replaceNote")
const {updateAllNotesTitle}=require("../controllers/notes/updateAll")
const {deleteNote}=require("../controllers/notes/delete")
const {getNotes}=require("../controllers/notes/getAllNotes")
const {getNoteById}=require("../controllers/notes/getNotesById")
const {getNoteByContent}=require("../controllers/notes/getNotesByContent")
const {getNotesUser}=require("../controllers/notes/getAllNotesUser")
const {getNotesAggregate}=require("../controllers/notes/getAllNotesAgrregate")
const {deleteAllNodes}=require("../controllers/notes/deleteAllNotes")




router.post("/notes",authMiddelware,createNote)
router.patch("/updatenotes/:noteId",authMiddelware,updateNotes)
router.put("/replacenotes/:noteId",authMiddelware,replaceNote)
router.patch("/updateAll",authMiddelware,updateAllNotesTitle)
router.delete("/delete/:noteId",authMiddelware,deleteNote)
router.get("/getnotes/:noteId",authMiddelware,getNotes)
router.get("/getnotesId/:noteId",authMiddelware,getNoteById)
router.get("/getnotescontent",authMiddelware,getNoteByContent)
router.get("/getnotesuser",authMiddelware,getNotesUser)
router.get("/getbyAggregate",authMiddelware,getNotesAggregate)
router.delete("/deleteallnotes",authMiddelware,deleteAllNodes)




module.exports=router;