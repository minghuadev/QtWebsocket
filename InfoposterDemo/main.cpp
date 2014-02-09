#include "mainwindow.h"
#include "Server.h"
#include <iostream>
#include <QApplication>

int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    qsrand(QDateTime::currentMSecsSinceEpoch());
    MainWindow w;
    w.show();

    return a.exec();
}
