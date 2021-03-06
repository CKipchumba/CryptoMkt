import {
  Box,
  HStack,
  Container,
  Spacer,
  IconButton,
  Collapse,
  useDisclosure,
  useColorModeValue,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons'
import Logo from '@/components/logo'
import SearchBar from '@/components/search-bar'
import NavMenu from '@/components/nav-menu'
import useBreakpoint from '@/hooks/useBreakpoint'
import { HEADER_HEIGHT, HEADER_GAP } from '@/constants/layout'
import MobileNav from '@/components/nav-menu/mobile-nav'
import HeaderButtons from './buttons'

const Header = () => {
  const { isLargeScreen } = useBreakpoint()
  const { isOpen, onToggle } = useDisclosure()
  const headerBg = useColorModeValue('whiteAlpha.900', 'black.1')
  const searchBg = useColorModeValue('transparent', 'black.4')
  const searchBorderColor = useColorModeValue('gray.1', 'black.4')
  return (
    <Box
      as="header"
      py={4}
      boxShadow="0 2px 0 rgba(0, 0, 0, 0.05)"
      height={HEADER_HEIGHT}
      position="sticky"
      top={0}
      backgroundColor={headerBg}
      backdropFilter="saturate(180%) blur(7px)"
      zIndex={2}
    >
      <Container as={HStack} maxW="container.2xl" spacing={HEADER_GAP}>
        <Logo />

        <SearchBar
          bgColor={searchBg}
          borderColor={searchBorderColor}
          _hover={{ borderColor: searchBorderColor }}
          _focus={{
            borderColor: searchBorderColor,
            boxShadow: '0 0 7px rgba(0, 0, 0, 0.1)',
          }}
        />

        {isLargeScreen && (
          <>
            <Spacer />
            <HStack spacing={HEADER_GAP}>
              <NavMenu />
              <HeaderButtons />
            </HStack>
          </>
        )}
        {!isLargeScreen && (
          <IconButton
            variant="unstyled"
            size="28px"
            display={{ lg: 'none' }}
            onClick={onToggle}
            color={useColorModeValue('gray.3', 'white')}
            icon={
              isOpen ? <CloseIcon w={5} h={5} /> : <HamburgerIcon w={7} h={7} />
            }
            aria-label={'Toggle Navigation'}
          />
        )}
      </Container>
      {!isLargeScreen && (
        <Collapse in={isOpen} animateOpacity>
          <MobileNav />
        </Collapse>
      )}
    </Box>
  )
}

export default Header
