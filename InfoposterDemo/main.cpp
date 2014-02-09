#include "mainwindow.h"
#include "Server.h"
#include <iostream>
#include <QApplication>
#include <QProcess>
#include <QUrl>


int main(int argc, char *argv[])
{
    QApplication a(argc, argv);
    qsrand(QDateTime::currentMSecsSinceEpoch());
    MainWindow w;
    QString chrome="google-chrome";
    QString path = QDir(QDir::currentPath()).filePath("index.html");

    QStringList arguments;
    arguments << "-app" << QUrl::fromLocalFile(path).toString();
    arguments << "--new-window" << "--kiosk";
    arguments << "--process-per-site";
    QProcess *chrome_process = new QProcess();
    chrome_process->start(chrome, arguments);

    w.show();
    w.setFocus();
    // this often doesn't work, if there are more browser windows open.
    // handle via the close connection at the browser level (websocket.onclose event)
    QObject::connect(&a, SIGNAL(aboutToQuit()), chrome_process, SLOT(kill()));

    return a.exec();
}
