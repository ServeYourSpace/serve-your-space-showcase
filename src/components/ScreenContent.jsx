import { useTheme } from '../context/ThemeContext';
import { screenSrc } from '../data/screens';
import ScreenImage from './ScreenImage';
import CategoriesMock from './mocks/CategoriesMock';
import NegotiationMock from './mocks/NegotiationMock';
import ChatMock from './mocks/ChatMock';

const MOCKS = { categories: CategoriesMock, negotiation: NegotiationMock, chat: ChatMock };

/** Renders a showcase screen: real screenshot (theme-aware) or a labelled illustration. */
export default function ScreenContent({ screen, alt, eager }) {
  const { isDark } = useTheme();
  if (screen.mock) {
    const Mock = MOCKS[screen.mock];
    return <Mock dark={isDark} />;
  }
  return <ScreenImage src={screenSrc(screen.id, isDark)} alt={alt} eager={eager} />;
}
