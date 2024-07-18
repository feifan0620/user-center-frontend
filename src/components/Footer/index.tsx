import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
const Footer: React.FC = () => {
  const defaultMessage = 'FEIFAN出品';
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'myBlog',
          title: '非凡栈道',
          href: 'http://www.feifan.ltd',
          blankTarget: true,
        },
        {
          key: 'github',
          title: (
            <>
              <GithubOutlined /> GitHub
            </>
          ),
          href: 'https://github.com/feifan0620',
          blankTarget: true,
        },
        {
          key: 'about',
          title: '关于作者',
          href: 'http://www.feifan.ltd/about',
          blankTarget: true,
        },
      ]}
    />
  );
};
export default Footer;
