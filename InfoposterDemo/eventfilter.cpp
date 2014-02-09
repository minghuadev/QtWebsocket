#include "eventfilter.h"
#include <QEvent>
#include <QKeyEvent>
#include <QDebug>

EventFilter::EventFilter( QPushButton *sendButton) :
    QObject(0)
{
    doSend = sendButton;
}

bool EventFilter::eventFilter(QObject *, QEvent *event) {
    bool ret_val=false;
    if ( event->type() == QEvent::KeyPress) {
        QKeyEvent *ke = static_cast<QKeyEvent*>(event);
        if ( ke->modifiers() == Qt::ControlModifier && ke->key() == Qt::Key_Return) {
            qDebug() << "yo";
            doSend->animateClick();
            ret_val= true;
        }
    }
    return ret_val;

}
