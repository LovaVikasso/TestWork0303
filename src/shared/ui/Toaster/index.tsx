'use client';

import {useEffect, useState} from 'react';
import s from './Toaster.module.scss';

type Props = {
  message: string;
}

export const Toast = ({message}: Props) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
      <div
          className={`toast show ${s.toast}`}
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
      >
        <div className="toast-header">
          <i className="bi bi-exclamation-triangle-fill text-danger me-2"></i>
          <strong className="me-auto">Error</strong>
          <button
              type="button"
              className="btn-close"
              data-bs-dismiss="toast"
              aria-label="Close"
              onClick={() => setIsVisible(false)}
          ></button>
        </div>
        <div className="toast-body">{message}</div>
      </div>
  );
};