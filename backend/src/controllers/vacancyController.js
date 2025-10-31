import Vacancy from "../models/Vacancy.js";
import Employer from "../models/Employer.js";
import Category from "../models/Category.js";
import Student from "../models/Student.js";
import User from "../models/User.js"
import Submission from "../models/Submission.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Вакансии
export async function getAllVacancies(req, res) {
  try {
    const vacancies = await Vacancy.find()
      .populate('employerId', 'name company')
      .populate('categoryId', 'name')
      .sort({ createdAt: -1 });
    res.status(200).json(vacancies);
  } catch (error) {
    console.error("Error in getAllVacancies controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function getVacancyById(req, res) {
  try {
    const vacancyId = req.params.id;
    const vacancy = await Vacancy.findById(vacancyId)
      .populate('employerId', 'name company')
      .populate('categoryId', 'name description');
    
    res.status(200).json(vacancy);
  } catch (error) {
    console.error("Error in getVacancyById controller", error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Vacancy not found!" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createVacancy(req, res) {
  try {
    const { title, description, employerId, categoryId, salary } = req.body;
    
    const newVacancy = new Vacancy({
      title,
      description,
      employerId,
      categoryId,
      salary
    });

    const savedVacancy = await newVacancy.save();
    res.status(201).json({ message: savedVacancy });
  } catch (error) {
    console.error("Error in createVacancy controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function updateVacancy(req, res) {
  try {
    const { title, description, employerId, categoryId, salary, isActive } = req.body;
    const vacancyId = req.params.id;

    const updatedVacancy = await Vacancy.findByIdAndUpdate(
      vacancyId,
      { title, description, employerId, categoryId, salary, isActive },
      { new: true }
    );
    
    res.status(200).json(updatedVacancy);
  } catch (error) {
    console.error("Error in updateVacancy controller", error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Vacancy not found!" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteVacancy(req, res) {
  try {
    const vacancyId = req.params.id;
    const deletedVacancy = await Vacancy.findByIdAndDelete(vacancyId);
    res.status(200).json(deletedVacancy);
  } catch (error) {
    console.error("Error in deleteVacancy controller", error);
    if (error.name === 'CastError') {
      return res.status(404).json({ message: "Vacancy not found!" });
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

// Пользователи
export async function registerUser(req, res) {
  try {
    const { email, password, role } = req.body;
    const candidate = await User.findOne({ email });
    
    if (candidate) {
      return res.status(400).json({ message: "Пользователь с таким email уже существует" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ email, password: hashedPassword, role: role || 'student' });
    
    await user.save();

    res.status(201).json({
      message: "Пользователь создан",
      userId: user._id
    });
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).json({ 
      message: "Ошибка сервера при регистрации" 
    });
  }
}

export async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
        return res.status(400).json({message: 'Пользователь не найден'})
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({message: "Неверный пароль, попробуйте снова"})
    }

    const token = jwt.sign(
        { userId: user.id },
        process.env.jwtSecret,
        { expiresIn: '1h'}
    )

    res.status(200).json({ token, userId: user.id, role })

  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).json({ 
      message: "Ошибка сервера при входе в аккаунт" 
    });
  }
}

// Работодатели
export async function createEmployer(req, res) {
  try {
    const { name, company, userId } = req.body;
    const employer = new Employer({
      name,
      company, 
      userId
    });

    await employer.save();
    res.status(201).json(employer);
  } catch (error) {
    res.status(500).json({ message: "Error creating employer" });
  }
}

export async function getAllEmployers(req, res) {
  try {
    const employers = await Employer.find().populate('userId', 'email');
    res.status(200).json(employers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employers" });
  }
}

// Категории
export async function createCategory(req, res) {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category" });
  }
}

export async function getAllCategories(req, res) {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories" });
  }
}

// Студенты
export async function createStudent(req, res) {
  try {
    const { name, group, userId } = req.body;
    const student = new Student({
      name,
      group, 
      userId
    });
    await student.save();
    res.status(201).json(student);
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ message: "Error creating student" });
  }
}

export async function getAllStudents(req, res) {
  try {
    const students = await Student.find().populate('userId', 'email');
    res.status(200).json(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ message: "Error fetching students" });
  }
}

// Отклики
export async function createSubmission(req, res) {
  try {
    const { studentId, vacancyId } = req.body;
    const submission = new Submission({
      studentId,
      vacancyId
    });

    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    console.error("Error creating submission:", error);
    res.status(500).json({ message: "Error creating submission" });
  }
}

export async function getStudentSubmissions(req, res) {
  try {
    const { studentId } = req.params;
    const submissions = await Submission.find({ studentId })
      .populate('vacancyId', 'title description salary');
    res.status(200).json(submissions);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({ message: "Error fetching submissions" });
  }
}

export async function deleteSubmission(req, res) {
  try {
    const submissionId = req.params.id;
    const deletedSubmission = await Submission.findByIdAndDelete(submissionId);
    
    if (!deletedSubmission) {
      return res.status(404).json({ message: "Submission not found" });
    }
    
    res.status(200).json({ message: "Submission deleted successfully" });
  } catch (error) {
    console.error("Error deleting submission:", error);
    res.status(500).json({ message: "Error deleting submission" });
  }
}