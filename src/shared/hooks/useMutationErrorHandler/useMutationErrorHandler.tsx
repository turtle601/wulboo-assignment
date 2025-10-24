import { useRouter } from 'next/navigation';
import {
  HTTP401Error,
  HTTP403Error,
  HTTP409Error,
  HTTP500Error,
  HTTPEtcError,
  UnExpectedAPIError,
} from '~/src/shared/api';
import { useModalStore } from '~/src/shared/ui/modal/store';

interface ErrorModalProps {
  title: string;
  message: string;
  redirectAction?: {
    label: string;
    onClick: () => void;
  };
  cancelAction?: {
    label: string;
    onClick: () => void;
  };
}

const ErrorModal = ({
  title,
  message,
  redirectAction,
  cancelAction,
}: ErrorModalProps) => (
  <div className="w-[400px] p-6 bg-white rounded-lg shadow-lg">
    <div className="flex items-center mb-4">
      <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3">
        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-5 h-5 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
    </div>
    <p className="text-gray-600 mb-6">{message}</p>
    <div className="flex justify-end space-x-3">
      {cancelAction && (
        <button
          onClick={cancelAction.onClick}
          className="px-4 py-2 text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
        >
          {cancelAction.label}
        </button>
      )}
      {redirectAction && (
        <button
          onClick={redirectAction.onClick}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          {redirectAction.label}
        </button>
      )}
    </div>
  </div>
);

export const useMutationErrorHandler = () => {
  const router = useRouter();
  const { openModal, closeModal } = useModalStore();

  return (error: Error) => {
    if (error instanceof HTTP401Error) {
      openModal(
        <ErrorModal
          title="로그인이 필요합니다"
          message="이 기능을 사용하려면 로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?"
          redirectAction={{
            label: '로그인하기',
            onClick: () => {
              closeModal();
              router.push('/');
            },
          }}
          cancelAction={{
            label: '취소',
            onClick: closeModal,
          }}
        />
      );
      return;
    }

    if (error instanceof HTTP403Error) {
      openModal(
        <ErrorModal
          title="접근 권한이 없습니다"
          message="이 기능을 사용할 권한이 없습니다. 강의 목록 페이지로 이동하시겠습니까?"
          redirectAction={{
            label: '강의 목록으로',
            onClick: () => {
              closeModal();
              router.push('/courses');
            },
          }}
          cancelAction={{
            label: '취소',
            onClick: closeModal,
          }}
        />
      );
      return;
    }

    if (error instanceof HTTP409Error) {
      openModal(
        <ErrorModal
          title="이미 회원가입을 한 적이 있습니다."
          message="이미 회원가입을 한 적이 있습니다. 강의목록 페이지로 이동하시겠습니까?"
          redirectAction={{
            label: '강의 목록으로',
            onClick: () => {
              closeModal();
              router.push('/courses');
            },
          }}
          cancelAction={{
            label: '취소',
            onClick: closeModal,
          }}
        />
      );
      return;
    }

    if (error instanceof HTTP500Error) {
      openModal(
        <ErrorModal
          title="서버 오류가 발생했습니다"
          message="일시적인 서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          redirectAction={{
            label: '확인',
            onClick: closeModal,
          }}
        />
      );
      return;
    }

    if (error instanceof HTTPEtcError || error instanceof UnExpectedAPIError) {
      openModal(
        <ErrorModal
          title="예상치 못한 오류가 발생했습니다"
          message="시스템에 예상치 못한 오류가 발생했습니다. 잠시 후 다시 시도해주세요."
          redirectAction={{
            label: '확인',
            onClick: closeModal,
          }}
        />
      );
      return;
    }
  };
};
