from flask import Flask, render_template, request, redirect, url_for
import sqlite3

app = Flask(__name__)


def get_db_connection():
    conn = sqlite3.connect('user_scores.db')
    conn.row_factory = sqlite3.Row
    return conn


def create_table():
    conn = get_db_connection()
    create_table_sql = """
    CREATE TABLE IF NOT EXISTS scores (
        id integer PRIMARY KEY,
        user_id integer NOT NULL,
        course text NOT NULL,
        score integer NOT NULL
    );
    """
    conn.execute(create_table_sql)
    conn.commit()
    conn.close()


def add_score(user_id, course, score):
    conn = get_db_connection()
    sql = '''INSERT INTO scores(user_id, course, score) VALUES(?,?,?)'''
    conn.execute(sql, (user_id, course, score))
    conn.commit()
    conn.close()


def calculate_combined_score(user_id):
    conn = get_db_connection()
    sql = '''SELECT SUM(score) AS total_score FROM scores WHERE user_id=?'''
    total_score = conn.execute(sql, (user_id,)).fetchone()['total_score']
    conn.close()
    return total_score if total_score else 0


@app.route('s/')
def index():
    create_table()  # Ensure the table is created
    return render_template('index.html')


@app.route('/scores/<int:user_id>')
def show_scores(user_id):
    scores = get_db_connection().execute('SELECT course, score FROM scores WHERE user_id = ?',
                                         (user_id,)).fetchall()
    total_score = calculate_combined_score(user_id)
    return render_template('scores.html', user_id=user_id, scores=scores, total_score=total_score)


@app.route('/add_score', methods=['GET', 'POST'])
def add_score_route():
    if request.method == 'POST':
        user_id = request.form['user_id']
        course = request.form['course']
        score = request.form['score']
        add_score(user_id, course, int(score))
        return redirect(url_for('show_scores', user_id=user_id))
    return render_template('add_score.html')


@app.route('/delete_scores/<int:user_id>', methods=['POST'])
def delete_scores(user_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM scores WHERE user_id = ?', (user_id,))
    conn.commit()
    conn.close()
    return redirect(url_for('index'))  # Redirect to the homepage or another appropriate page


@app.route('/view_all')
def view_all():
    conn = get_db_connection()
    all_scores = conn.execute('SELECT user_id, course, score FROM scores').fetchall()
    conn.close()
    return render_template('view_all.html', all_scores=all_scores)


if __name__ == '__main__':
    app.run(debug=True)