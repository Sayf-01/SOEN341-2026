# CareerNet
A web-based platform that allows job seekers and recruiters to connect. The System allows users to upload and manage their resumes/Cover letters. Furthermore, it tracks applications and follows the progress of their application.

## Technologies

- **Front end:** React, CSS, HTML, TypeScript
- **Back end:** Python, FastAPI
- **Database:** PostgreSQL
- **Database tools:** SQLAlchemy (ORM), Alembic (migrations)
- **Version Control:** GitHub

## Team

- **Sayf** — Lead, Database Backend 
- **Lamees** - General Backend Developer
- **Dany** — Frontend Developer
- **Youssef** - General Backend Developer 
- **Krish** - Frontend Developer/Database
- **Krish** - Frontend Developer
- **Kaila** - Database Backend

## Problem
Job seekers keep their resumes, applications, and deadlines scattered across
emails, spreadsheets, and job sites, which makes it easy to lose track of
where each application stands. Recruiters also lack a simple place to post
jobs and follow applicants.

## Solution
CareerNet puts everything in one place. Job seekers manage their profile and
resumes, apply to jobs, and track each application's status. Recruiters post
jobs and review applicants.
## Features

**Job seekers**
- Account registration (#5)
- Login (#6)
- Resume upload and update (#16)
- Application status tracking: Applied, Interview, Offered, Rejected (#17)
- Notifications for job postings and deadlines (#18)
- Applications dashboard (#19)
- AI-generated resume feedback (#20)
- Career goal and CV-based job matching (#26)
- Job search and filtering (#27)
- Save jobs to favourites (#28)

**Recruiters**
- Create job postings (#21)
- Edit or close job postings (#22)
- View applicants for a posting (#23)
- Update applicant status (#24)
- Search and filter candidates (#25)


## Set up
**Step 1: clone and pull the latest code**
- Ensure you're on the Main branch by running this on the terminal and have the latest update by running:
 ```bash
  git checkout main
  git pull origin main
  ```

**Step 2: Create a virtual environment**
- Run this on your terminal:
  ```bash
  python3 -m venv .venv
  ```

**Step 3: Activate virtual Environment**
- Ensure you're inside the (.venv) by running this on your terminal: (afterwards you should see  "(.venv)" at the beginning of the line)
  ```bash
  source .venv/bin/activate
  ```



**Step 4: install all dependencies**
 - Once inside (.venv) run this to install all dependencies:
```bash
  pip install -r requirements.txt
  ```

**Step 5: Environment variables**

In the root folder, create a file named exactly ".env" with:

- DATABASE_URL=your-database-link
JWT_SECRET_KEY=any-long-random-string (generate with:
python -c "import secrets; print(secrets.token_hex(32))")
CORS_ORIGINS=http://localhost:5173

Never commit this file. Each teammate creates their own.

## Run Steps:
 - We'll require two terminals to run the website.

### For the Backend run:
   ```bash
    uvicorn App.main:app --reload
  ```
### For the Frontend run: 
   ```bash
    npm install
    npm run dev
  ```

## Repository
https://github.com/Sayf-01/SOEN341-2026
