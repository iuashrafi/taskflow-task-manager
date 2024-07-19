from sqlalchemy import Column, Integer, String, DateTime, Date, func, \
    ForeignKey
from database import Base
from sqlalchemy.orm import relationship


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String, index=True)
    status = Column(String, index=True, default="todo")
    duedate = Column(Date)
    order_no = Column(Integer, index=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    # Defining the relationship to Workspace
    # i.e. every task comes under a Workspace

    workspace_id = Column(Integer, ForeignKey("workspaces.id"))
    workspace = relationship("Workspace", back_populates="tasks")


class Workspace(Base):
    __tablename__ = "workspaces"

    id = Column(Integer, primary_key=True)
    unique_id = Column(String, unique=True, index=True)
    name = Column(String)
    created_at = Column(DateTime, default=func.now())

    # Define the relationship to Task
    tasks = relationship("Task", back_populates="workspace")
