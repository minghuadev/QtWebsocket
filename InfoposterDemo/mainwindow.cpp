#include <QDebug>

#include "mainwindow.h"
#include "ui_mainwindow.h"
#include "eventfilter.h"

MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent),
    ui(new Ui::MainWindow)
{
    myServer = new Server(1888);
    ui->setupUi(this);
    ui->toBrowser->installEventFilter( new EventFilter(ui->sendToBrowser));
}

MainWindow::~MainWindow()
{
    delete ui;
}

void MainWindow::on_sendToBrowser_clicked()
{
    QString s = ui->toBrowser->toPlainText().trimmed();
    myServer->sendToClients(s);
    ui->logWindow->appendPlainText(s);
    ui->toBrowser->clear();
    ui->toBrowser->setFocus();
}
