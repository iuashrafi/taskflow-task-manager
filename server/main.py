from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models
from models import Task, Workspace
from typing import List
from sqlalchemy import asc
import uuid
from schemas import TaskSchema, WorkspaceCreateSchema, WorkspaceSchema
from schemas import CreateTaskReqSchema
from schemas import UpdateTestSchema
from schemas import UpdateTaskReqSchema
from schemas import RenameWorkspaceSchema


# Creating the database tables
models.Base.metadata.create_all(bind=engine)


app = FastAPI()

# Add CORS middleware
origins = [
    "http://localhost:5173",  # React app running on localhost:5173
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dependency to get the DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ---------------------TASK APIs----------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------
# ----------------------------------------------------------

@app.get("/")
def index():
    return "Hello world from Imtiaz"


# API endpoint to fetch all tasks for a workspace
@app.get("/api/tasks/{workspace_id}", response_model=List[TaskSchema])
def get_tasks(workspace_id: int, db: Session = Depends(get_db)):
    # check if workspace exists
    workspace = db.query(Workspace).filter(
        Workspace.id == workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    tasks = db.query(Task).filter(Task.workspace_id == workspace_id)\
        .order_by(asc(Task.order_no)).all()
    return tasks

# API end point to create a new task


@app.post("/api/tasks/")
def create_task(task: CreateTaskReqSchema, db: Session = Depends(get_db)):

    # check if workspace exists
    workspace = db.query(Workspace).filter(
        Workspace.id == task.workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    # if workspace exists
    # then push to database and return the response, steps as follows:-

    # count the existing no of tasks to update order_no
    existing_tasks_count = db.query(Task).count()

    db_task = Task(title=task.title,
                   description=task.description,
                   duedate=task.duedate,  # optional
                   order_no=existing_tasks_count,
                   workspace_id=task.workspace_id
                   )
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task


# API endpoint to update order_no and status of tasks
@app.put("/api/update_tasks")
async def testing(req: UpdateTestSchema, db: Session = Depends(get_db)):
    print(f"Received request: {req}")

    # check for workspace existence
    workspace = db.query(Workspace).filter(
        Workspace.id == req.workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    for task in req.tasks:
        db_task = db.query(Task)\
            .filter(Task.id == task.id, Workspace.id == req.workspace_id)\
            .first()
        if db_task:
            db_task.order_no = task.order_no
            db_task.status = task.status

    db.commit()
    return req.tasks


# API endpoint to delete a task
@app.delete("/api/tasks/{task_id}", status_code=204)
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Deleted successfully"}


# API end point for task update
@app.put("/api/tasks/{task_id}")
def update_task(req: UpdateTaskReqSchema, db: Session = Depends(get_db)):
    # check for workspace
    workspace = db.query(Workspace).filter(
        Workspace.id == req.workspace_id).first()
    if not workspace:
        raise HTTPException(status_code=404, detail="Workspace not found")

    db_task = db.query(Task).filter(Task.id == req.id).first()
    if db_task is None:
        raise HTTPException(status_code=404, detail="Task not found")

    if req.title is not None:
        db_task.title = req.title

    if req.description is not None:
        db_task.description = req.description

    if req.duedate is not None:
        db_task.duedate = req.duedate

    if req.duedate is not None:
        db_task.duedate = req.duedate

    db.commit()
    db.refresh(db_task)
    return db_task


# -------------------------------------------------
# -------------------------------------------------
# -------------------------------------------------
# -------------------------------------------------
# -------------------------------------------------
# -------------  WORKSPACES APIs ------------------
# -------------------------------------------------
# -------------------------------------------------
# -------------------------------------------------
# -------------------------------------------------

# API endpoint to create a new workspace

@app.post("/api/workspaces/", response_model=WorkspaceSchema)
def create_workspace(workspace: WorkspaceCreateSchema,
                     db: Session = Depends(get_db)):
    unique_id = str(uuid.uuid4())

    # Ensure that unique_id does not already exists previously in the database
    # if it does exists, then loop until a fresh unique_id is generated

    while db.query(Workspace).filter(Workspace.unique_id == unique_id).first()\
            is not None:
        unique_id = str(uuid.uuid4())

    workspace = Workspace(unique_id=unique_id, name=workspace.name)
    db.add(workspace)
    db.commit()
    db.refresh(workspace)
    return workspace

# API end point to get a workspace given workspace unique_id


@app.get("/api/workspaces/{workspace_unique_id}")
def get_workspace(workspace_unique_id: str, db: Session = Depends(get_db)):
    workspace = db.query(Workspace).filter(
        Workspace.unique_id == workspace_unique_id).first()
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")
    return workspace


# API endpoint to rename workspace

@app.put("/api/workspaces/")
def rename_workspace(req: RenameWorkspaceSchema,
                     db: Session = Depends(get_db)):
    workspace = db.query(Workspace).filter(
        Workspace.id == req.workspace_id).first()
    if workspace is None:
        raise HTTPException(status_code=404, detail="Workspace not found")

    workspace.name = req.name
    db.commit()
    db.refresh(workspace)
    return workspace
