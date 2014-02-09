#include <QDebug>
#include <QJsonDocument>
#include <QJsonObject>

#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "eventfilter.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    myServer = new Server(1888);
    ui->setupUi(this);
    // EventFilter captures control-return, and clicks the toBrowser button.
    ui->toBrowser->installEventFilter( new EventFilter(ui->sendToBrowser));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_sendToBrowser_clicked()
{
    /*
     * the command to the browser is packet into a json object, where a
     * 'cmd' field will be 'evalled' by the browser (just for demo and debugging).
     *
     * no other parameters currently being used
     */
    QJsonObject json;
    json.insert("cmd", ui->toBrowser->toPlainText().trimmed());

    QString s = (new QJsonDocument(json))->toJson();

    myServer->sendToClients(s);
    ui->logWindow->appendPlainText(s);
    ui->toBrowser->clear();
    ui->toBrowser->setFocus();
}
