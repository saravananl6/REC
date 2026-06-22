from flask import Flask, render_template, request, jsonify, redirect, url_for
import openpyxl
import os
from datetime import datetime

app = Flask(__name__)

EXCEL_FILE = 'chatbot_leads.xlsx'

def init_excel():
    if not os.path.exists(EXCEL_FILE):
        wb = openpyxl.Workbook()
        ws = wb.active
        ws.title = "Leads"
        ws.append(["Timestamp", "Name", "Email", "Phone", "Messages"])
        wb.save(EXCEL_FILE)

def save_lead(name, email, phone, messages=""):
    init_excel()
    wb = openpyxl.load_workbook(EXCEL_FILE)
    ws = wb.active
    ws.append([datetime.now().strftime("%Y-%m-%d %H:%M:%S"), name, email, phone, messages])
    wb.save(EXCEL_FILE)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/academics')
def academics():
    return render_template('academics.html')

@app.route('/admissions')
def admissions():
    return render_template('admissions.html')

@app.route('/placements')
def placements():
    return render_template('placements.html')

@app.route('/research')
def research():
    return render_template('research.html')

@app.route('/life')
def life():
    return render_template('life.html')

@app.route('/facilities')
def facilities():
    return render_template('facilities.html')

@app.route('/alumni')
def alumni():
    return render_template('alumni.html')

@app.route('/tour360')
def tour360():
    return render_template('tour360.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/naac')
def naac():
    return render_template('naac.html')

@app.route('/anti-ragging')
def anti_ragging():
    return render_template('anti_ragging.html')

@app.route('/save_lead', methods=['POST'])
def save_lead_route():
    data = request.json
    save_lead(data.get('name',''), data.get('email',''), data.get('phone',''), data.get('messages',''))
    return jsonify({"status": "ok"})

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.json
    message = data.get('message', '').lower()
    step = data.get('step', 'greet')

    responses = {
        'admission': "🎓 Admissions at REC are open for UG & PG programs! You can apply online at rec.ac.in. Cut-off for 2025 batch starts from 120+ marks in Maths. Need more info on a specific branch?",
        'placement': "💼 REC has an outstanding placement record: 350+ recruiters, 40 LPA highest package, 2300+ offers annually. Companies like TCS, Infosys, Wipro, Amazon visit campus. Want details on a specific company?",
        'fee': "💰 Fee structure varies by branch. Engineering programs range from ₹85,000–₹1,20,000 per year. Scholarships available based on merit and income. Visit admissions office or call 044-26810103.",
        'course': "📚 REC offers B.E./B.Tech in CSE, ECE, EEE, Mechanical, Civil, IT, AIDS, AIML and more. PG programs: M.E., MBA, MCA. Which branch interests you?",
        'hostel': "🏠 REC has separate hostels for boys and girls with modern amenities, AC rooms, Wi-Fi, gym, and 24/7 security. Fees approx ₹75,000/year. Interested?",
        'sports': "⚽ REC has world-class sports facilities — cricket, football, basketball, volleyball, badminton, gym, and swimming pool! Regular inter-college tournaments are held.",
        'naac': "🏆 REC is NAAC A+ accredited — the highest grade awarded by the National Assessment and Accreditation Council of India!",
        'transport': "🚌 REC provides transport from major locations in Chennai and surrounding areas. Contact the transport office at 044-26810103 for routes and fees.",
        'library': "📖 REC Library has 1,00,000+ books, e-journals, DELNET access, and 24/7 reading rooms. One of the best in Tamil Nadu!",
        'contact': "📞 Contact REC at: 044-26810103 | 📧 info@rajalakshmi.org | 📍 Rajalakshmi Engineering College, Thandalam, Chennai - 602 105",
        'scholarship': "🎓 Various scholarships available: Government, Management, Sports quota. Merit-based discounts up to 100%. Contact the scholarship cell for details.",
        'events': "🎉 REC hosts Invicta (cultural fest), Mechanova (tech fest), National Innovation Day, and many more events throughout the year!",
        'research': "🔬 REC has 15+ research centers, 500+ publications, funded projects from DST, AICTE, and industry. Check our research portal for details.",
    }

    reply = "I'm here to help! You can ask me about **admissions, placements, fees, courses, hostel, sports, NAAC, transport, library, scholarships, events, or research**. What would you like to know? 😊"
    
    for key, response in responses.items():
        if key in message:
            reply = response
            break

    return jsonify({"reply": reply})

if __name__ == '__main__':
    init_excel()
    app.run(debug=True)
