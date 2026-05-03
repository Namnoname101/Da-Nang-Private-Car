/**
 * COMPONENT: RichTextEditor
 * Editor WYSIWYG sử dụng Quill trực tiếp (không qua react-quill)
 * Tương thích hoàn toàn với React 19
 */

import React, { useRef, useEffect, useCallback } from 'react';

// Import Quill trực tiếp từ react-quill package
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

/**
 * Cấu hình toolbar cho editor
 */
const TOOLBAR_OPTIONS = [
  [{ header: [1, 2, 3, 4, false] }],
  ['bold', 'italic', 'underline', 'strike'],
  [{ color: [] }, { background: [] }],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ align: [] }],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video'],
  ['clean'],
];

const RichTextEditor = ({ value, onChange, placeholder = 'Viết nội dung bài viết tại đây...' }) => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const isInternalChange = useRef(false);

  // Khởi tạo Quill editor khi component mount
  useEffect(() => {
    if (editorRef.current && !quillRef.current) {
      const quill = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder,
        modules: {
          toolbar: TOOLBAR_OPTIONS,
        },
      });

      // Lắng nghe sự kiện thay đổi nội dung
      quill.on('text-change', () => {
        isInternalChange.current = true;
        const html = quill.root.innerHTML;
        // Nếu chỉ có tag rỗng, coi như empty
        const isEmpty = html === '<p><br></p>' || html === '<p></p>';
        onChange && onChange(isEmpty ? '' : html);
      });

      quillRef.current = quill;

      // Set giá trị ban đầu nếu có
      if (value) {
        quill.root.innerHTML = value;
      }
    }

    return () => {
      // Cleanup không cần thiết vì Quill tự quản lý
    };
  }, []);

  // Đồng bộ value từ ngoài vào editor (khi edit bài viết)
  useEffect(() => {
    if (quillRef.current && !isInternalChange.current) {
      const currentContent = quillRef.current.root.innerHTML;
      if (value !== currentContent && value !== undefined) {
        quillRef.current.root.innerHTML = value || '';
      }
    }
    isInternalChange.current = false;
  }, [value]);

  return (
    <div style={{ background: '#fff' }}>
      <div ref={editorRef} style={{ minHeight: 250 }} />
    </div>
  );
};

export default RichTextEditor;
