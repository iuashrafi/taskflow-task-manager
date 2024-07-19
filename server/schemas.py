from pydantic import BaseModel, validator
from typing import Optional, List
from datetime import datetime, date

# ----------------------------------------------
# ----------------------------------------------
# ----------------------------------------------
# -------------- Task Schemas-------------------
# ----------------------------------------------
# ----------------------------------------------
# ----------------------------------------------


class TaskSchema(BaseModel):  # schema for Task Created Response
    id: int
    order_no: int
    title: str
    description: str
    status: str
    created_at: datetime
    updated_at: datetime
    duedate: Optional[date] = None

    class Config:
        from_attributes = True


class UpdateTaskReqSchema(BaseModel):
    workspace_id: int
    id: int  # which is a task_id
    title: Optional[str] = None
    description: Optional[str] = None
    duedate: Optional[date] = None


class EachTask(BaseModel):
    id: int
    order_no: int
    status: str


class UpdateTestSchema(BaseModel):
    workspace_id: int
    tasks: List[EachTask]


# create task request schema
class CreateTaskReqSchema(BaseModel):
    workspace_id: int
    title: str
    description: Optional[str] = None
    duedate: Optional[date] = None  # note : here we are expecting date

    @validator('duedate', pre=True, always=True)
    def check_duedate(cls, v):
        if v == "":
            return None
        return v


# -----------------------------------------
# -----------------------------------------
# -----------------------------------------
# --------------Workspace schemas----------
# -----------------------------------------
# -----------------------------------------

class RenameWorkspaceSchema(BaseModel):  # rename schema
    name: str
    workspace_id: int


class WorkspaceCreateSchema(BaseModel):
    name: str


class WorkspaceSchema(BaseModel):
    id: int
    unique_id: str
    name: str
    created_at: datetime
    tasks: Optional[List[TaskSchema]] = []

    class Config:
        from_attributes = True
